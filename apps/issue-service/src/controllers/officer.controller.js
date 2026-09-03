import {
  getDashboardService, getPendingIssuesService,getIssueDetailsService,acceptIssueService,getAssignedIssuesService,updateIssueStatusService,uploadProgressImagesService,
  getIssueTimelineService, getInProgressIssuesService,getResolvedIssuesService
} from "../services/officer.service.js";

export const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const dashboard =
      await getDashboardService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingIssues = async (
  req,
  res,
  next
) => {
  try {
    const issues =
      await getPendingIssuesService();

    return res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    next(error);
  }
};

export const getIssueDetails = async (
  req,
  res,
  next
) => {
  try {
    const issue =
      await getIssueDetailsService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};


export const acceptIssue = async (
  req,
  res,
  next
) => {
  try {
    const { latitude, longitude } = req.body;

    const issue =
      await acceptIssueService(
        req.params.id,
        req.user.id,
        latitude,
        longitude
      );

    res.status(200).json({
      success: true,
      message: "Issue accepted successfully",
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignedIssues = async (
  req,
  res,
  next
) => {
  try {
    const issues =
      await getAssignedIssuesService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    next(error);
  }
};


export const updateIssueStatus = async (
  req,
  res,
  next
) => {
  try {
    const {
      status,
      remark,
      latitude,
      longitude,
    } = req.body;

    const issue =
      await updateIssueStatusService(
        req.params.id,
        req.user.id,
        status,
        remark,
        latitude,
        longitude
      );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      data: issue,
    });
  } catch (error) {
    next(error);
  }
};


export const uploadProgressImages = async (
  req,
  res,
  next
) => {
  try {
    const images =
      await uploadProgressImagesService(
        req.params.id,
        req.user.id,
        req.files
      );

    res.status(201).json({
      success: true,
      message:
        "Progress images uploaded successfully.",
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

export const getIssueTimeline = async (
  req,
  res,
  next
) => {
  try {
    const timeline =
      await getIssueTimelineService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: timeline,
    });
  } catch (error) {
    next(error);
  }
};

export const getInProgressIssues = async (
  req,
  res
) => {
  try {
    const data =
      await getInProgressIssuesService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResolvedIssues = async (
  req,
  res
) => {
  try {
    const data =
      await getResolvedIssuesService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};