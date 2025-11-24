import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      setUsuario(JSON.parse(usuarioLogueado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('token');
    setUsuario(null);
    navigate('/');
  };

  // Aquí verificamos si el usuario tiene el rol ADMIN o ROLE_ADMIN
  const esAdmin = usuario?.roles?.some(r => r === 'ADMIN' || r === 'ROLE_ADMIN');

  return (
    <header>
      <h1>HuertoHogar</h1>
      <nav>
        <ul className="menuder">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/blog">Blog</Link></li>

          {esAdmin && (
            <li>
              <button onClick={() => navigate('/admin/productos')}>
                Admin Productos
              </button>
            </li>
          )}

          <li id="cuenta">
            {usuario ? (
              <>
                <span style={{ marginRight: '10px' }}>{usuario.nombre}</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')}>Iniciar sesión</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
