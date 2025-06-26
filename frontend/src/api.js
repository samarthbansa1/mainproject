// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        // Try to refresh token
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh/",
          { refresh: refreshToken }
        );
        const { access, refresh } = response.data;
        localStorage.setItem("access_token", access);
        if (refresh) localStorage.setItem("refresh_token", refresh);

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
