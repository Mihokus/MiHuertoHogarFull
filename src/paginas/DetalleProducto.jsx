import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/Api";

function DetalleProducto() {
  const { codigo } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    API.get(`/productos/${codigo}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error(err));
  }, [codigo]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>Precio: {producto.precio}</p>
      <button>Agregar al carrito</button> 
    </div>
  );
}

export default DetalleProducto;