import axios from "axios";

const API_URL = "http://localhost:8081/auth";

class AuthService {

    async login(email, password) {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    }

    async register(nombre, email, password) {
        const response = await axios.post(`${API_URL}/register`, {
            nombre,
            email,
            password
        });
        return response.data;
    }

    logout() {
        localStorage.removeItem("token");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    async getCurrentUser() {
        const token = this.getToken();

        if (!token) return null;

        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    }
}

export default new AuthService();
