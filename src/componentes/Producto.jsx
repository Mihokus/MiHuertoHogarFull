import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { CarritoContext } from "../context/CarritoContext";

function Producto({ producto, isDestacado = false }) {
  const navigate = useNavigate(); 
  const { agregarAlCarrito } = useContext(CarritoContext);

  const handleImageClick = () => {
    if (!isDestacado) {
      navigate(`/producto/${producto.codigo}`);
    }
  };

  
  const precioDisplay = isDestacado ? (
    <>
      {producto.precioOferta ? (
        <>
          <del style={{ color: "#888" }}>${producto.precio}</del>
          <strong style={{ color: "#e53935", marginLeft: "6px" }}>
            ${producto.precioOferta} CLP {producto.unidad}
          </strong>
        </>
      ) : (
        `$${producto.precio} CLP ${producto.unidad}`
      )}
    </>
  ) : (
    `$${producto.precio} CLP ${producto.unidad}`
  );

  return (
    <article className="articulo">
      <h3>{producto.codigo} - {producto.nombre}</h3>

      <img 
        src={producto.imagenUrl || "https://via.placeholder.com/150"} 
        alt={producto.nombre} 
        onClick={!isDestacado ? handleImageClick : undefined}
        style={{ cursor: !isDestacado ? "pointer" : "default" }}
      />

      <p>Precio: {precioDisplay}</p>

      
      {producto.stock > 0 ? (
        <button className="agregarAlCarrito" onClick={() => agregarAlCarrito(producto)}>
          <i className="fas fa-cart-plus"></i> Agregar al carrito
        </button>
      ) : (
        <p style={{ color: "#D32F2F", fontWeight: "bold" }}>Agotado</p>
      )}
    </article>
  );
}

export default Producto;
