import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CarritoContext } from "../context/CarritoContext";

function Header() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);
  const { carrito } = useContext(CarritoContext);

  const cantidadTotal =
    carrito?.items?.reduce((total, item) => total + item.cantidad, 0) || 0;

  const esAdmin = usuario?.roles?.some((r) => {
    const valor = typeof r === "string" ? r : r.nombre;
    return valor?.toUpperCase().includes("ADMIN");
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header-title">HuertoHogar</h1>

      <nav>
        <ul className="menu">
          <li><Link className="link" to="/">Inicio</Link></li>
          <li><Link className="link" to="/catalogo">Catálogo</Link></li>
          <li><Link className="link" to="/blog">Blog</Link></li>
          <li><Link className="link" to="/historial">Mis compras</Link></li>

          <li
            className="carrito-link"
            onClick={() => navigate("/carrito")}
            style={{ cursor: "pointer" }}
          >
            Carrito 🛒{" "}
            {cantidadTotal > 0 && (
              <span className="carrito-badge">{cantidadTotal}</span>
            )}
          </li>

          {esAdmin && (
            <button className="btn-admin" onClick={() => navigate("/admin/productos")}>
              Admin
            </button>
          )}

          <li className="cuenta">
            {usuario ? (
              <>
                <span className="username">{usuario.nombre}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button className="btn-login" onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
