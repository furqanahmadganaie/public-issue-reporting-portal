import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of the Express application

const PORT = process.env.PORT || 4000;

const IDENTITY_SERVICE_URL = process.env.IDENTITY_SERVICE_URL;
const ISSUE_SERVICE_URL = process.env.ISSUE_SERVICE_URL;


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Gateway is running",
  });
});


// Identity Service
app.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: IDENTITY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/v1/auth${path}`,
  })
);


// Issue Service
app.use(
  "/api/issues",
  createProxyMiddleware({
    target: ISSUE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/issues${path}`,
    
  })
);


// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Gateway route not found",
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Identity Service: ${IDENTITY_SERVICE_URL}`);
  console.log(`Issue Service: ${ISSUE_SERVICE_URL}`);
});