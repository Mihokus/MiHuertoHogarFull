import React, { useEffect, useState } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import Producto from '../componentes/Producto';
import API from '../api/Api';

function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    API.get("/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return (
    <>
      <Header />
      <main style={{ padding: '40px 5%' }}>
        <h2>Catálogo</h2>
        <div className='lista-productos'>
          {productos.map((producto) => (
            <Producto 
              key={producto.id} 
              producto={producto} 
              isDestacado={false} 
            />
          ))}
        </div>
      </main>
      <Informacion />
      <Footer />
    </>
  );
}

export default Catalogo;