import React, { useEffect, useState } from "react";
import API from "../api/Api";

function Historial() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const res = await API.get("/carrito/historial");
        console.log(" Historial recibido:", res.data);
        setPedidos(res.data);
      } catch (err) {
        console.error("Error cargando historial:", err);
      }
    };

    cargarHistorial();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ color: "#38761D", textAlign: "center", marginBottom: "20px", fontSize: "28px" }}>
        Historial de Compras
      </h2>

      {pedidos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555", fontSize: "18px", marginTop: "25px" }}>
          Aún no tienes compras registradas
        </p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} style={{ backgroundColor: "#FFFFFF", borderRadius: "10px",
            padding: "15px", marginBottom: "20px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
            
            <div style={{
              display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc",
              paddingBottom: "10px", marginBottom: "10px"
            }}>
              <h3 style={{ fontSize: "20px", color: "#2E7D32" }}>Pedido #{pedido.id}</h3>
              <span style={{
                color: pedido.estado === "COMPLETADO" ? "#2E7D32" : "#FF7043",
                fontWeight: "bold", fontSize: "16px"
              }}>
                {pedido.estado}
              </span>
            </div>

            <p style={{ fontSize: "17px", marginBottom: "10px" }}>
              <strong>Total:</strong> <span style={{ fontWeight: "600" }}>${pedido.total}</span>
            </p>

            <h4 style={{ color: "#38761D", fontSize: "18px" }}>Productos:</h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {pedido.items.map((item) => (
                <li key={item.productoId} style={{
                  backgroundColor: "#F6FBE9", padding: "10px", borderRadius: "6px",
                  marginBottom: "8px", borderLeft: "5px solid #8BC34A"
                }}>
                  <strong>{item.nombre}</strong> x {item.cantidad} → <span>${item.subtotal}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Historial;
