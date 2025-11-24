import React, { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useContext(CarritoContext);

  const navigate = useNavigate();
  const [mensajeFinal, setMensajeFinal] = useState("");


  const totalPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    const guardado = localStorage.getItem("mensajeFinalCompra");
    if (guardado) setMensajeFinal(guardado);
  }, []);


  const checkout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    vaciarCarrito();

    const mensaje = "¡Pedido realizado con éxito!";
    setMensajeFinal(mensaje);
    localStorage.setItem("mensajeFinalCompra", mensaje);
  };

 
  const handleVaciar = () => {
    vaciarCarrito();
    setMensajeFinal("");
    localStorage.removeItem("mensajeFinalCompra");
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Mi Carrito</h2>

    
      {mensajeFinal && carrito.length === 0 ? (
        <p className="carrito-mensaje-exito">{mensajeFinal}</p>
      ) : carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito esta vacio</p>
      ) : null}

    
      {carrito.length > 0 && (
        <table className="carrito-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>${item.precio.toLocaleString()}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(item.id, parseInt(e.target.value))
                    }
                    className="carrito-input"
                  />
                </td>
                <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="carrito-btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
      {carrito.length > 0 && (
        <div className="carrito-resumen">
          <p><strong>Productos:</strong> {totalProductos}</p>
          <p><strong>Total a pagar:</strong> ${totalPagar.toLocaleString()}</p>
        </div>
      )}

      
      {carrito.length > 0 && (
        <div className="carrito-botones">
          <button className="carrito-btn-vaciar" onClick={handleVaciar}>
            Vaciar Carrito
          </button>

          <button className="carrito-btn-finalizar" onClick={checkout}>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrito;
