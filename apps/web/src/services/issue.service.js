import axiosIssue from "../api/axiosIssue";

const issueService = {
  createIssue(formData) {
    return axiosIssue.post("/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getMyIssues() {
    return axiosIssue.get("/issues/my");
  },

  getIssueById(issueId) {
    return axiosIssue.get(`/issues/${issueId}`);
  },
};

export default issueService;