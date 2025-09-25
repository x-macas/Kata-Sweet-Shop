import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend endpoint
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
