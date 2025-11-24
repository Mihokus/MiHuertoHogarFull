import { createContext, useState, useEffect } from "react";
import API from "../api/Api";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState({ items: [] });

  const token = localStorage.getItem("token");
  const usandoBackend = !!token;


  useEffect(() => {
    if (usandoBackend) cargarCarritoServidor();
    else cargarLocalCarrito();
  }, [token]);


  const cargarCarritoServidor = async () => {
    try {
      const res = await API.get("/carrito");
      setCarrito(res.data);
    } catch (e) {
      console.error("❌ Error cargando carrito del servidor:", e);
    }
  };

 
  const cargarLocalCarrito = () => {
    const guardado = localStorage.getItem("carrito");
    setCarrito(guardado ? JSON.parse(guardado) : { items: [] });
  };

 
  const syncLocalStorage = (nuevoCarrito) => {
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

 
  const agregarAlCarrito = async (producto, cantidad = 1) => {
    if (usandoBackend) {
      const res = await API.post("/carrito/items", {
        productoId: producto.id,
        cantidad
      });
      setCarrito(res.data);
      return;
    }

   
    const existe = carrito.items.find((item) => item.id === producto.id);

    let nuevo;
    if (existe) {
      nuevo = {
        items: carrito.items.map((i) =>
          i.id === producto.id
            ? {
                ...i,
                cantidad: i.cantidad + cantidad,
                subtotal: (i.cantidad + cantidad) * i.precio
              }
            : i
        )
      };
    } else {
      nuevo = {
        items: [
          ...carrito.items,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagenUrl: producto.imagenUrl,
            cantidad,
            subtotal: producto.precio * cantidad
          }
        ]
      };
    }

    syncLocalStorage(nuevo);
  };


  const actualizarCantidad = async (productoId, cantidad) => {
    if (usandoBackend) {
      const res = await API.put("/carrito/items", {
        productoId,
        cantidad
      });
      setCarrito(res.data);
      return;
    }

    
    const nuevo = {
      items: carrito.items.map((i) =>
        i.id === productoId
          ? { ...i, cantidad, subtotal: i.precio * cantidad }
          : i
      )
    };

    syncLocalStorage(nuevo);
  };


  const eliminarDelCarrito = async (productoId) => {
    if (usandoBackend) {
      const res = await API.delete(`/carrito/items/${productoId}`);
      setCarrito(res.data);
      return;
    }

    const nuevo = {
      items: carrito.items.filter((item) => item.id !== productoId)
    };

    syncLocalStorage(nuevo);
  };

  
  const vaciarCarrito = async () => {
    if (usandoBackend) {
      const res = await API.delete("/carrito");
      setCarrito(res.data);
      return;
    }
    syncLocalStorage({ items: [] });
  };


  const checkout = async () => {
    if (!token) return false;
    await API.post("/carrito/checkout");
    setCarrito({ items: [] });
    return true;
  };


  const cantidadTotal = carrito.items.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        checkout,
        cantidadTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
