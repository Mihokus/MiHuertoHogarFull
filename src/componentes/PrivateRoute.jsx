import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {

 
  const storedUser = localStorage.getItem("usuario");
  const usuario = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;


  if (!usuario) return <Navigate to="/login" />;


  const rolesUsuario = usuario.roles?.map(r => 
    typeof r === "string" ? r.toUpperCase() : r.nombre?.toUpperCase()
  );

 
  const permitido = rolesUsuario?.some(rol =>
    rol === requiredRole.toUpperCase() ||    
    rol.includes(requiredRole.toUpperCase())  
  );


  return permitido ? children : <Navigate to="/" />;
}

export default PrivateRoute;