import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import { productos } from '../data/Productos'; 

function DetalleProducto() {
  const { codigo } = useParams();
  
  const producto = productos.find(p => p.codigo === codigo);

  if (!producto) {
    return (
      <>
        <Header />
        <main style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Producto No Encontrado</h2>
          <p>El producto con código {codigo} no existe.</p>
          <Link to="/catalogo">Volver al Catálogo</Link>
        </main>
        <Informacion />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ padding: '40px 5%' }}>
        <Link to="/catalogo" style={{ color: '#38761D', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Volver al Catálogo
        </Link>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <img 
            src={producto.imagenUrl} 
            alt={producto.nombre} 
            style={{ 
              width: '400px', 
              height: 'auto', 
              borderRadius: '8px', 
              objectFit: 'cover' 
            }} 
          />
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#38761D', borderBottom: '2px solid #FFC107', paddingBottom: '10px' }}>
              {producto.nombre} ({producto.codigo})
            </h2>
            <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#333' }}>
              Precio: ${producto.precio} CLP {producto.unidad}
            </p>
            <p style={{ fontSize: '1rem', margin: '15px 0', color: '#555' }}>
              Stock: {producto.stock}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: '20px 0' }}>
              Descripción: {producto.descripcion}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#777' }}>
              Categoría: {producto.categoria}
            </p>
            <button className="agregarAlCarrito" style={{ marginTop: '30px', padding: '12px 25px', fontSize: '1rem' }}>
              <i className="fas fa-cart-plus"></i> Agregar al carrito
            </button>
          </div>
        </div>
      </main>
      <Informacion />
      <Footer />
    </>
  );
}

export default DetalleProducto;