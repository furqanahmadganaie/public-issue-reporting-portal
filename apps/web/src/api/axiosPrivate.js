import axios from "./axios";
import tokenManager from "../utils/tokenManager";

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Request Interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "/auth/refresh"
        );

        const newAccessToken =
          refreshResponse.data.data.accessToken;

        tokenManager.setToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        tokenManager.clearToken();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;