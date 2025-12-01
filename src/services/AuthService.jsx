import API from "../api/Api";

class AuthService {

  async login(email, password) {
    const response = await API.post(`/auth/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data)); 
    }

    return response.data;
  }

  async register(nombre, email, password) {
    const response = await API.post(`/auth/register`, { nombre, email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data)); 
    }

    return await this.login(email, password);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    const user = localStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
