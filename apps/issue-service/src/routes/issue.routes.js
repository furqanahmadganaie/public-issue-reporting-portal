import express from "express";

import { createIssue } from "../controllers/issue.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createIssue);

export default router;