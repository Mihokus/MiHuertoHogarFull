
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
    setUsuario(null);
    navigate('/'); 
  };

  return (
    <header>
      <h1>HuertoHogar</h1>
      <nav>
        <ul className="menuizq">
          <li className="categoria">
            Categorías
            <ul className="submenu">
              <li>Frutas frescas</li>
              <li>Verduras organicas</li>
              <li>Productos organicos</li>
              <li>Productos lacteos</li>
            </ul>
          </li>
        </ul>
      </nav>
      <form className="busqueda">
        <input type="text" placeholder="Buscar productos" />
        <button type="submit">lupa</button>
      </form>
      <nav>
        <ul className="menuder">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catalogo</Link></li>
          <li>Carrito</li>
          <li>Perfil</li>
          <li><Link to="/blog">Blog</Link></li>
          <li>Reseñas</li>
          <li id="cuenta">
            {usuario ? (
              <>
                <span style={{ marginRight: '10px' }}>{usuario.email}</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')}>Ingresar Cuenta</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;