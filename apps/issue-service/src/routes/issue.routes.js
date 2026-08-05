import express from "express";

import { createIssue,getMyIssues ,getIssueById} from "../controllers/issue.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import { uploadIssueImages } from "../middlewares/upload.middleware.js"


const router = express.Router();

router.post("/", authenticate, uploadIssueImages, createIssue);
router.get("/my", authenticate, getMyIssues);
router.get("/:id", authenticate, getIssueById);

export default router;