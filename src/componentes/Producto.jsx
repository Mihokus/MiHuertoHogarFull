
import React from 'react';

function Producto({ producto, isDestacado = false }) {
  const precioDisplay = isDestacado ? (
    <>
      <del>${producto.precio}</del> <strong>${producto.precioOferta} CLP {producto.unidad}</strong>
    </>
  ) : (
    `$${producto.precio} CLP ${producto.unidad}`
  );

  return (
    <article className="articulo">
      <h3>{producto.codigo} - {producto.nombre}</h3>
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <p>Precio: {precioDisplay}</p>
      {!isDestacado && (
        <>
          <p>Stock: {producto.stock}</p>
          <p>Descripción: {producto.descripcion}</p>
          <button className="agregarAlCarrito">
            <i className="fas fa-cart-plus"></i> Agregar al carrito
          </button>
        </>
      )}
      
    </article>
  );
}

export default Producto;