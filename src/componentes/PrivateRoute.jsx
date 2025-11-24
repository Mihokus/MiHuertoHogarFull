import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuario) return <Navigate to="/login" />;
  if (requiredRole && usuario.rol !== requiredRole) return <Navigate to="/" />;

  return children;
}

export default PrivateRoute;