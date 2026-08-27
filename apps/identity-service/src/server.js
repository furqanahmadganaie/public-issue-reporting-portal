
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import {generateOTP} from "./utils/otp.js";

dotenv.config(); // reads .env file and sets environment variables

import pool from "./config/database.js";

const app = express(); // Create an instance of an Express application it returns an object
//  that can be used to configure the server, define routes, and handle requests and responses.
 
// Security Middleware    /// app.use() means attach middleware to the Express app
app.use(helmet()); // Helmet is a middleware that helps secure Express applications by setting various HTTP headers. 
// It can help protect against common web vulnerabilities, such as cross-site scripting (XSS), clickjacking, and other attacks.
//  By using Helmet, you can enhance the security of your application with minimal effort.

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); 
// CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that restricts web pages
//  from making requests to a different domain than the one that served the web page.


app.use(express.json()); // This middleware is used to parse incoming requests with JSON payloads.
//  It converts the JSON data into a JavaScript object that can be accessed via req.body in your route handlers. 
// Without this middleware, req.body would be undefined for JSON requests, making it difficult to work with the data sent by the client.

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true })); // This middleware is used to parse incoming requests with URL-encoded payloads,
//  such as form submissions. The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format,
//  enabling more complex data structures to be sent in the request body. 
// It converts the URL-encoded data into a JavaScript object that can be accessed via req.body in your route handlers.
 
// Parse URL-encoded request body 
app.use(cookieParser()); // This middleware is used to parse cookies from incoming requests. It populates the req.cookies object with key-value pairs representing the cookies sent by the client. This allows you to easily access and work with cookies in your route handlers, such as for authentication or session management.

app.use("/api/v1/auth", authRoutes);



// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Identity Service is running",
        environment: process.env.NODE_ENV  // process.env stores environment variables, including those from .env file
    });
     //status.json.... is chaining methods to send a JSON response with a status code and a JSON object containing success, message, and environment information.
//     res.status(200);
// res.json({
//   success: true
// });
//req.params, req.query, req.body are all ways to access different parts of the incoming request. req.params is used for route parameters, req.query is used for query string parameters or filters opions , and req.body is used for the request body (usually for POST or PUT requests). In this case, since it's a GET request to /health, there are no parameters or body to access.

});

const PORT = process.env.PORT || 3001; // fallback to 3001 if PORT is not defined in .env

try {
    //result is promise that resolves to the result of the query. It contains information about the query execution, 
    // including the rows returned, row count, and any errors that occurred during execution.


  const result = await pool.query("SELECT NOW();");   // This line executes a simple SQL query to retrieve the 
  // current date and time from the PostgreSQL database. The NOW() function returns the current timestamp. 
  // The result of this query is stored in the result variable, which can be used to check if the database
  //  connection is successful and to log the current timestamp.


  console.log("PostgreSQL Database Connected");
   console.log(result.rows[0]);
  
} catch (error) {
  console.error(" PostgreSQL Database Connection Failed");
  console.error(error.message);
  process.exit(1); // Exit the process with a non-zero status code to indicate failure
}



app.listen(PORT, () => {
    console.log(`🚀 Identity Service running on port ${PORT}`);
});

console.log(generateOTP()); 