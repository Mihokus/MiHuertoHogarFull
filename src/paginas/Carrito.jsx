import React, { useEffect, useState } from "react";
import API from "../api/Api";

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    API.get("/carrito")
      .then(res => setCarrito(res.data.items))
      .catch(err => console.error(err));
  }, []);

  const handleCheckout = () => {
    API.post("/carrito/checkout")
      .then(res => alert("Compra realizada"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Carrito</h2>
      {carrito.map(item => (
        <div key={item.producto.id}>
          {item.producto.nombre} x {item.cantidad}
        </div>
      ))}
      <button onClick={handleCheckout}>Pagar</button>
    </div>
  );
}

export default Carrito;
