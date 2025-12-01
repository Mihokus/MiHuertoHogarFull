

import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8082", 
});

const AUTH_URL = "http://localhost:8081/auth";
let isRefreshing = false;
let failedQueue = [];


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;