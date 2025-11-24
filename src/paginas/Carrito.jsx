import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { carrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, checkout } =
    useContext(CarritoContext);

  const navigate = useNavigate();
  const [mensajeCompra, setMensajeCompra] = useState("");

  const items = carrito.items ?? []; // 🟢 compatible backend o local

  const total = items.reduce((sum, item) => sum + (item.subtotal ?? item.precio * item.cantidad), 0);

  const realizarCompra = async () => {
    const ok = await checkout();
    if (!ok) {
      navigate("/login");
      return;
    }

    setMensajeCompra("Pedido realizado con éxito.");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#38761D", marginBottom: "15px" }}>Mi Carrito</h2>

      {mensajeCompra && (
        <p style={{ color: "green", textAlign: "center", fontWeight: "bold" }}>{mensajeCompra}</p>
      )}

      {items.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
          {mensajeCompra ? "Gracias por su compra ❤️" : "Tu carrito está vacío 🛒"}
        </p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#8BC34A", color: "white" }}>
                <th style={{ padding: "10px" }}>Producto</th>
                <th style={{ padding: "10px" }}>Precio</th>
                <th style={{ padding: "10px" }}>Cantidad</th>
                <th style={{ padding: "10px" }}>Total</th>
                <th style={{ padding: "10px" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "10px" }}>{item.nombre}</td>
                  <td style={{ padding: "10px" }}>${item.precio}</td>

                  <td style={{ padding: "10px" }}>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                      style={{
                        width: "50px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "5px",
                      }}
                    />
                  </td>

                  <td style={{ padding: "10px" }}>
                    ${item.subtotal ?? item.precio * item.cantidad}
                  </td>

                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      style={{
                        backgroundColor: "#FF3D00",
                        padding: "5px 10px",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "20px", textAlign: "right" }}>Total: ${total}</h3>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={vaciarCarrito}
              style={{
                backgroundColor: "#FFC107",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Vaciar carrito
            </button>

            <button
              onClick={realizarCompra}
              style={{
                backgroundColor: "#38761D",
                padding: "10px",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
