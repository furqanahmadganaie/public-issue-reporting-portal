import upload from "../config/multer.js";

export const uploadIssueImages = upload.array(
  "images",
  5
);