
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Identity Service is running",
        environment: process.env.NODE_ENV
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Identity Service running on port ${PORT}`);
});