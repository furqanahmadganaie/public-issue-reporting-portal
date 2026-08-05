import { createIssueService ,getMyIssuesService,getIssueByIdService} from "../services/issue.service.js";

export const createIssue = async (req, res) => {
  try {

     console.log("Body:", req.body);
    console.log("Files:", req.files);
        const issue = await createIssueService(
      req.body,
      req.files,
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

export const getMyIssues = async (
  req,
  res
) => {
  try {
    const issues = await getMyIssuesService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getIssueById = async (
  req,
  res
) => {
  try {
    const issue =
      await getIssueByIdService(
        req.params.id,
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

