import express from "express";

import 
  authenticate 
 from "../middlewares/auth.middleware.js";

import {
  getDashboard, getPendingIssues,getIssueDetails,acceptIssue,getAssignedIssues,updateIssueStatus,
   uploadProgressImages, getIssueTimeline,getInProgressIssues,getResolvedIssues
} from "../controllers/officer.controller.js";
import authorize from "../middlewares/authorize.middleware.js";
import {ROLES} from "../constants/roles.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize(ROLES.MUNICIPAL_OFFICER),
  getDashboard
);

 router.get(
  "/issues/pending",
  authenticate,
  authorize(ROLES.MUNICIPAL_OFFICER),
  getPendingIssues
);

router.get(
  "/issues/assigned",
  authenticate,
  authorize("Municipal Officer"),
  getAssignedIssues
);


router.get(
  "/issues/in-progress",
  authenticate,
  authorize("Municipal Officer"),
  getInProgressIssues
);

router.get(
  "/issues/resolved",
  authenticate,
  authorize("Municipal Officer"),
  getResolvedIssues
);


router.get(
  "/issues/:id",
  authenticate,
  authorize("Municipal Officer"),
  getIssueDetails
);

router.put(
  "/issues/:id/accept",
  authenticate,
  authorize("Municipal Officer"),
  acceptIssue
);
router.patch(
  "/issues/:id/status",
  authenticate,
  authorize("Municipal Officer"),
  updateIssueStatus
);

router.post(
  "/issues/:id/progress-images",
  authenticate,
  authorize("Municipal Officer"),
  upload.array("images", 5),
  uploadProgressImages
);

router.get(
  "/issues/:id/timeline",
  authenticate,
  getIssueTimeline
);

export default router;