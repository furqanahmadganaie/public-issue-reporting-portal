// contains the business logic for authentication and authorization,database queries, hashing 

import bcrypt from "bcrypt";
import validator from "validator";
import pool from "../config/database.js";
import jwt from "jsonwebtoken";
import {generateOTP} from "../utils/otp.js"; 
import { sendOTP } from "./sms.service.js"; // Import the sendOTP function from the sms.service.js file. This function is responsible for sending the generated OTP to the user's phone number via SMS. It is used in the registerUser function to send an OTP after a user successfully registers, providing an additional layer of security and verification.




export const registerUser = async (userData) => {
  const client = await pool.connect();
  // The purpose of this line is to obtain a client connection from the connection pool. This client will be used to execute queries against the database. By using a client from the pool, the application can efficiently manage database connections, allowing for better performance and resource utilization. It also enables the use of transactions, as a transaction must run on a single database connection.
   //Because a transaction must run on one database connection. So you borrow one connection:

  try {
    const { first_name, email, password, phone } = userData;

    if (!first_name || !email || !password) {
      throw new Error("First name, email and password are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Start Transaction
    await client.query("BEGIN");

    const result = await client.query(
      `
      INSERT INTO users
      (first_name, email, password_hash, phone)
      VALUES ($1,$2,$3,$4)
      RETURNING id, first_name, email, phone, created_at
      `,
      [first_name, email, passwordHash, phone]
    );

    // Assign the "Citizen" role to the newly registered user. This involves querying the roles table to get the id of the "Citizen" role and then inserting a record into the user_roles table to associate the new user with that role. This step is crucial for implementing role-based access control in the application, ensuring that users have appropriate permissions based on their assigned roles.
    const roleResult = await client.query(
      `
      SELECT id
      FROM roles
      WHERE name = $1
      `,
      ["Citizen"]
    );

    const roleId = roleResult.rows[0].id;

    await client.query(
      `
      INSERT INTO user_roles
      (user_id, role_id)
      VALUES ($1,$2)
      `,
      [result.rows[0].id, roleId]
    );



// Generate OTP
const otp = generateOTP();

// Hash OTP
const otpHash = await bcrypt.hash(otp, 10);

// OTP expires after 10 minutes
const expiresAt = new Date();
expiresAt.setMinutes(expiresAt.getMinutes() + 5);

// Save OTP in database
await client.query(
  `
  INSERT INTO phone_verification_tokens
  (user_id, phone, otp_hash, expires_at)
  VALUES ($1, $2, $3, $4)
  `,
  [
    result.rows[0].id,
    phone,
    otpHash,
    expiresAt,
  ]
);



 // Commit Transaction
 await client.query("COMMIT");

// Send OTP after successful commit
await sendOTP(phone, otp);

return result.rows[0];


  } catch (error) {

    // Undo everything
    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }
};



export const verifyPhone = async ({ phone, otp }) => {
  const client = await pool.connect();// The purpose of this line is to obtain a client connection from the connection pool. This client will be used to execute queries against the database. By using a client from the pool, the application can efficiently manage database connections, allowing for better performance and resource utilization. It also enables the use of transactions, as a transaction must run on a single database connection.
    let transactionStarted = false;
  try {
    // Validate input
    if (!phone || !otp) {
      throw new Error("Phone number and OTP are required");
    }

    // Get latest OTP for this phone number
    const result = await client.query(
      `
      SELECT *
      FROM phone_verification_tokens
      WHERE phone = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [phone]
    );

    if (result.rows.length === 0) {
      throw new Error("OTP not found");
    }

    const verification = result.rows[0];

    // Check OTP expiry
    if (new Date() > verification.expires_at) {
      throw new Error("OTP has expired");
    }

    // Limit attempts
    if (verification.attempts >= 5) {
      throw new Error("Too many invalid attempts. Please request a new OTP.");
    }

    // Compare OTP with hashed OTP
    const isValidOTP = await bcrypt.compare(
      otp,
      verification.otp_hash
    );



    // wrong otp 
    if (!isValidOTP) {

    const attempts = verification.attempts + 1;

    if (attempts >= 5) {

        await client.query(
            `
            DELETE FROM phone_verification_tokens
            WHERE id = $1
            `,
            [verification.id]
        );

        throw new Error(
            "Too many invalid attempts. Please request a new OTP."
        );
    }

    await client.query(
        `
        UPDATE phone_verification_tokens
        SET attempts = attempts + 1
        WHERE id = $1
        `,
        [verification.id]
    );

    throw new Error("Invalid OTP");
}





    // Start transaction
    await client.query("BEGIN");


      transactionStarted = true;


    // Mark phone as verified
    await client.query(
      `
      UPDATE users
      SET is_phone_verified = TRUE,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [verification.user_id]
    );

    // Delete OTP after successful verification
    await client.query(
      `
      DELETE FROM phone_verification_tokens
      WHERE id = $1 AND user_id = $2
      `,
      [verification.id, verification.user_id]
    );

    // Commit transaction
    await client.query("COMMIT");
    transactionStarted = false;

    return {
      success: true,
      message: "Phone number verified successfully.",
    };

  } catch (error) {

     if (transactionStarted) {
      await client.query("ROLLBACK");
    }

    throw error;

  } finally {

    client.release();

  }
};


export const resendOTPService = async ({ phone }) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  // Check if user exists
  const userResult = await pool.query(
    `
    SELECT id, is_phone_verified
    FROM users
    WHERE phone = $1
    `,
    [phone]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = userResult.rows[0];

  // Phone already verified
  if (user.is_phone_verified) {
    throw new Error("Phone number is already verified");
  }

  // Delete any existing OTPs for this phone
  await pool.query(
    `
    DELETE FROM phone_verification_tokens
    WHERE phone = $1
    `,
    [phone]
  );

  // Generate new OTP
  const otp = generateOTP();

  // Hash OTP
  const otpHash = await bcrypt.hash(otp, 10);

  // OTP expires after 10 minutes
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  // Store new OTP
  await pool.query(
    `
    INSERT INTO phone_verification_tokens
    (
      user_id,
      phone,
      otp_hash,
      expires_at
    )
    VALUES ($1, $2, $3, $4)
    `,
    [
      user.id,
      phone,
      otpHash,
      expiresAt,
    ]
  );

  // Send OTP
  await sendOTP(phone, otp);

  return {
    success: true,
    message: "OTP sent successfully.",
  };
};



export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Validate email
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0]; // user object contains all the user details fetched from the database, including id, first_name, email, password_hash, phone, created_at, and updated_at.
  
  // Compare the provided password with the stored hashed password using bcrypt.compare. This function takes the plain text password and the hashed password from the database and checks if they match.
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );
 
  // If the password is not valid, throw an error indicating that the email or password is invalid. This prevents unauthorized access to the system.
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }


// Fetch the roles associated with the user from the database. This involves querying the roles table and joining it with the user_roles table to get all roles assigned to the user. The roles are then mapped to an array of role names, which can be used for authorization purposes in the application.
  const roleResult = await pool.query(
  `
  SELECT r.name
  FROM roles r
  INNER JOIN user_roles ur
    ON ur.role_id = r.id
  WHERE ur.user_id = $1
  `,
  [user.id]
);

const roles = roleResult.rows.map(role => role.name);


  // Generate JWT token using jsonwebtoken library. The token includes the user's id and email as payload, and it is signed with a secret key (JWT_SECRET) defined in the environment variables. The token also has an expiration time (JWT_EXPIRES_IN) specified in the environment variables.
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles: roles, // Include the user's roles in the JWT payload for authorization purposes. This allows the application to check the user's roles when accessing protected routes or performing actions that require specific permissions.
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  // return  token ;


  const refreshToken = jwt.sign(
  {
    id: user.id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  }
);

// Decode the refresh token to get the expiration time. 
// The decoded token contains the expiration time in seconds since the epoch,
//  which is then converted to a JavaScript Date object for easier handling
//  and storage in the database.

const decodedRefreshToken = jwt.verify(
  refreshToken,
  process.env.REFRESH_TOKEN_SECRET
);

const expiresAt = new Date(decodedRefreshToken.exp * 1000);


// Store the refresh token in the database for future validation and management. The refresh token is associated with the user's id and has an expiration date set to 7 days from the current date. This allows the system to manage refresh tokens, including revoking them if necessary, and provides a way for users to obtain new access tokens without having to log in again.
await pool.query(
  `
    INSERT INTO refresh_tokens
    (user_id, token, expires_at)
    VALUES ($1,$2,$3)
  `,
  [
    user.id,
    refreshToken,
    expiresAt,
  ]
);

return {
  user: {
    id: user.id,
    first_name: user.first_name,
    email: user.email,
    phone: user.phone,
  },
  accessToken,
  refreshToken,
};
  
};



export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // Verify JWT signature and expiry
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // Check if token exists in database
  const result = await pool.query(
    `
    SELECT * FROM refresh_tokens
    WHERE token = $1
    `,
    [refreshToken]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid refresh token");
  }

  // Generate new access token
  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return accessToken;
};

export const logoutUser = async (refreshToken) => {

    if (!refreshToken) {
        throw new Error("Refresh token is required");
    }

    const result = await pool.query(
        `
        DELETE FROM refresh_tokens
        WHERE token = $1
        RETURNING id
        `,
        [refreshToken]
    );

    if (result.rows.length === 0) {
        throw new Error("Invalid refresh token");
    }
};
