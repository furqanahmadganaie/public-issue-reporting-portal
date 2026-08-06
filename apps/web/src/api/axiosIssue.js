import axios from "axios";
import tokenManager from "../utils/tokenManager";

const axiosIssue = axios.create({
  baseURL: "http://localhost:3002/api",
  withCredentials: true,
});

axiosIssue.interceptors.request.use((config) => {
  const token = tokenManager.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosIssue;