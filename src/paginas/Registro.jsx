import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await AuthService.register(nombre, email, password);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "usuarioLogueado",
          JSON.stringify({
            nombre: response.nombre,
            email: response.email,
            roles: response.roles,
          })
        );

        setSuccess("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setError("El correo ya está registrado o hubo un error.");
      console.log(err);
    }
  };

  return (
    <div id="forms-container">
      <div id="register-form">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

          <button type="submit">Registrarse</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
