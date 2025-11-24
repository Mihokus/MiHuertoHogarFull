import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuario) return <Navigate to="/login" />;

  const permitido = usuario.roles?.some(r => {
    const valor = typeof r === "string" ? r : r.nombre;
    return valor.toUpperCase().includes(requiredRole.toUpperCase());
  });

  return permitido ? children : <Navigate to="/" />;
}

export default PrivateRoute;
