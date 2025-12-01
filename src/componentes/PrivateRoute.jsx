import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {

  // CORRECCIÓN: Cambiado de "usuarioLogueado" a "user" para coincidir con AuthService
  const storedUser = localStorage.getItem("usuario");
  const usuario = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  // Si no hay usuario, redirigir al login
  if (!usuario) return <Navigate to="/login" />;

  // Normalizar roles para la comparación (maneja tanto array de strings como de objetos)
  const rolesUsuario = usuario.roles?.map(r => 
    typeof r === "string" ? r.toUpperCase() : r.nombre?.toUpperCase()
  );

  // Verificar si tiene el rol requerido
  const permitido = rolesUsuario?.some(rol =>
    rol === requiredRole.toUpperCase() ||    
    rol.includes(requiredRole.toUpperCase())  
  );

  // Si tiene permiso, mostrar el componente hijo; si no, volver al inicio
  return permitido ? children : <Navigate to="/" />;
}

export default PrivateRoute;