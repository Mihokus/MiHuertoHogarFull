import axios from "axios";

// CORRECCIÓN: Apuntar al Gateway (Puerto 8080)
const API = axios.create({
  baseURL: "http://localhost:8080", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;