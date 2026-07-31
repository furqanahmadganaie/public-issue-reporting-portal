import dotenv from "dotenv";

dotenv.config(); // reads .env file and sets environment variables
import pg from "pg";
// pg module is used to connect to the PostgreSQL database.
//  It provides a Pool class that manages a pool of connections
//  to the database, allowing for efficient reuse of connections 
// and better performance in applications that require frequent 
// database access.

const { Pool } = pg;  
//pg has multiple exports, including the Pool class , client,types,defaults . The
// Destructuring assignment to extract the Pool class from the pg module. This allows us to create a new instance of a connection pool to manage database connections.
// what is destructuring assignment? It is a JavaScript expression that allows you to unpack values from arrays or properties from objects into distinct variables. In this case, it extracts the Pool class from the pg module, enabling us to create a new instance of a connection pool for managing database connections.

// Pool is js class job is to manage a pool of connections to the database, allowing for efficient reuse of connections and better performance in applications that require frequent database access. It handles connection creation, management, and cleanup automatically, making it easier to work with databases in a scalable way.
//it keeps a pool of reusable connections.After the query finishes, the connection goes back into the pool.
//This is much faster than creating a new connection for every request

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(typeof process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;