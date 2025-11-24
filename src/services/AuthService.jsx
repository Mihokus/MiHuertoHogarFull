import axios from "axios";

const API_URL = "http://localhost:8081/auth";

class AuthService {

  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data)); 
    }

    return response.data;
  }

  async register(nombre, email, password) {
    const response = await axios.post(`${API_URL}/register`, { nombre, email, password });

  
    return await this.login(email, password);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
