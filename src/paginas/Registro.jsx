import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Registro() {
  const { setUsuario } = useContext(UserContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await AuthService.register(nombre, email, password);

      setUsuario({
        nombre: data.nombre,
        email: data.email,
        roles: data.roles
      });

      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div id="forms-container">
      <form id="register-form" onSubmit={handleRegister}>
        <h2>Crear Cuenta</h2>

        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Correo</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Registrarme</button>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Registro;
