import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Django backend URL
});

// Add token automatically for all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axiosInstance;
