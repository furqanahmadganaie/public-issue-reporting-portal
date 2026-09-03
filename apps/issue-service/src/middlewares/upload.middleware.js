import upload from "../config/multer.js";

export const uploadIssueImages = upload.array(
  "images", // images is from field name 
  5
);