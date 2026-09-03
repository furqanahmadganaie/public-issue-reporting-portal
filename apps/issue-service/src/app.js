import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import issueRoutes from "./routes/issue.routes.js";
import officerRoutes from "./routes/officer.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/issues", issueRoutes);

app.use("/api/officer",officerRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Issue Service is running",
  });
});

export default app;