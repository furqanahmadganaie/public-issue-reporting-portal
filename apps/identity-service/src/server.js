
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config(); // reads .env file and sets environment variables

import pool from "./config/database.js";

const app = express(); // Create an instance of an Express application it returns an object that can be used to configure the server, define routes, and handle requests and responses.
 
// Security Middleware    /// app.use() means attach middleware to the Express app
app.use(helmet());

// Enable CORS
app.use(cors()); // if origin is allowed continue else reject 

// Parse JSON request body // without it req.body will undefined for JSON requests it converts incoming JSON payloads into JavaScript objects, making it easier to work with the data in your route handlers.
app.use(express.json());

// Health Check Route
app.get("/health", (req, res) => {
    //status.json.... is chaining methods to send a JSON response with a status code and a JSON object containing success, message, and environment information.
    res.status(200).json({ 
        success: true,
        message: "Identity Service is running",
        environment: process.env.NODE_ENV  // process.env stores environment variables, including those from .env file
    });
//     res.status(200);
// res.json({
//   success: true
// });
//req.params, req.query, req.body are all ways to access different parts of the incoming request. req.params is used for route parameters, req.query is used for query string parameters or filters opions , and req.body is used for the request body (usually for POST or PUT requests). In this case, since it's a GET request to /health, there are no parameters or body to access.

});

const PORT = process.env.PORT || 3001; // fallback to 3001 if PORT is not defined in .env





try {
    //result is promise that resolves to the result of the query. It contains information about the query execution, including the rows returned, row count, and any errors that occurred during execution.
  const result = await pool.query("SELECT NOW();");
  console.log("Database Connected");
   console.log(result.rows[0]);
  
} catch (error) {
  console.error(" Database Connection Failed");
  console.error(error.message);
  process.exit(1); // Exit the process with a non-zero status code to indicate failure
}

app.listen(PORT, () => {
    console.log(`🚀 Identity Service running on port ${PORT}`);
});