// contains the business logic for authentication and authorization,database queries, hashing 

import bcrypt from "bcrypt";
import validator from "validator";
import pool from "../config/database.js";

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