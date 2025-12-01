import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";

function DetalleProducto() {
  const { codigo } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await axios.get("http://localhost:8082/productos");
        const encontrado = res.data.find((p) => p.codigo === codigo);
        setProducto(encontrado || null);
      } catch (err) {
        console.error("Error cargando producto:", err);
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [codigo]);

  if (loading) return <p className="detalle-cargando">Cargando producto...</p>;
  if (!producto) return <p className="detalle-error">Producto no encontrado</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-imagen-container">
        <img 
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="detalle-imagen"
        />
      </div>

      <div className="detalle-info">
        <h2>{producto.nombre}</h2>
        <p className="detalle-codigo">Código: {producto.codigo}</p>
        <p className="detalle-precio">${producto.precio} CLP</p>
        <p className="detalle-stock">
          {producto.stock > 0 ? `Stock: ${producto.stock}` : "Agotado"}
        </p>

        <p className="detalle-descripcion">{producto.descripcion || "Sin descripción disponible."}</p>

        <button
          onClick={() => agregarAlCarrito(producto)}
          disabled={producto.stock === 0}
          className={`detalle-btn ${producto.stock === 0 ? "disabled" : ""}`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
