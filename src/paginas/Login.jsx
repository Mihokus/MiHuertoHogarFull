import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AuthService.login(email, password);

      if (response?.token) {
     
        setUsuario({
          id: response.id,
          nombre: response.nombre,
          email: response.email,
          roles: response.roles
        });

        navigate("/");
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div id="forms-container">
      <div id="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

          <button type="submit">Entrar</button>
        </form>

        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/registro" style={{ color: "#38761D", fontWeight: "bold" }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
