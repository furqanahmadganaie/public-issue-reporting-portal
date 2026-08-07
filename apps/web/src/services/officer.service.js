import axiosIssue from "../api/axiosIssue";

const officerService = {
  getDashboard() {
    return axiosIssue.get("/officer/dashboard");
  },

  getPendingIssues() {
    return axiosIssue.get("/officer/issues/pending");
  },

  getAssignedIssues() {
    return axiosIssue.get("/officer/issues/assigned");
  },

  // ⭐ NEW
  getInProgressIssues() {
    return axiosIssue.get("/officer/issues/in-progress");
  },

  // ⭐ NEW
  getResolvedIssues() {
    return axiosIssue.get("/officer/issues/resolved");
  },

  getIssueDetails(id) {
    return axiosIssue.get(`/officer/issues/${id}`);
  },

  acceptIssue(id, data) {
    return axiosIssue.put(
      `/officer/issues/${id}/accept`,
      data
    );
  },

  updateStatus(id, data) {
    return axiosIssue.patch(
      `/officer/issues/${id}/status`,
      data
    );
  },

  uploadProgressImages(id, formData) {
    return axiosIssue.post(
      `/officer/issues/${id}/progress-images`,
      formData
    );
  },

  getTimeline(id) {
    return axiosIssue.get(
      `/officer/issues/${id}/timeline`
    );
  },
};

export default officerService;