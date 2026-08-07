// This file only calls backend APIs.
import axiosInstance from "../api/axios";
import axiosPrivate from "../api/axiosPrivate";

const authService = {
  register(data) {
    return axiosInstance.post("/auth/register", data);
  },

  login(data) {
    return axiosInstance.post("/auth/login", data);
  },

  verifyPhone(data) {
    return axiosInstance.post("/auth/verify-phone", data);
  },

  resendOTP(data) {
    return axiosInstance.post("/auth/resend-otp", data);
  },

  forgotPassword(data) {
    return axiosInstance.post("/auth/forgot-password", data);
  },

  resetPassword(data) {
    return axiosInstance.post("/auth/reset-password", data);
  },

  refreshToken() {
    return axiosPrivate.post("/auth/refresh");
  },

  logout() {
    return axiosPrivate.post("/auth/logout");
  },
};

export default authService;