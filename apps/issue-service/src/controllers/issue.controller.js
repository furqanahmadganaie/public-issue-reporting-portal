import { createIssueService } from "../services/issue.service.js";

export const createIssue = async (req, res) => {
  try {
    const issue = await createIssueService(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};