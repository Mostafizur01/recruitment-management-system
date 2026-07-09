import axios from "axios";

const apiBase =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.URL_API_BASE ||
  "http://localhost:3000";

const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    if (status === 403) {
      window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
