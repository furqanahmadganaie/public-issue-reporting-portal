// contains the business logic for authentication and authorization,database queries, hashing 

import bcrypt from "bcrypt";
import validator from "validator";
import pool from "../config/database.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  const { first_name, email, password, phone } = userData;

  // Check required fields
  if (!first_name || !email || !password) {
    throw new Error("First name, email and password are required");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  // Check if email already exists
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already registered");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user
  const result = await pool.query(
    `INSERT INTO users
    (first_name, email, password_hash, phone)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, email, phone, created_at`,
    [first_name, email, passwordHash, phone]
  );

  return result.rows[0];
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


  // Generate JWT token using jsonwebtoken library. The token includes the user's id and email as payload, and it is signed with a secret key (JWT_SECRET) defined in the environment variables. The token also has an expiration time (JWT_EXPIRES_IN) specified in the environment variables.
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
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
