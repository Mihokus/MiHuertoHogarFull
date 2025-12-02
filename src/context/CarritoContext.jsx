import { createContext, useState, useEffect } from "react";
import API from "../api/Api";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState({ items: [] });

  // 🔍 Helper: saber si estoy logueado en cada momento
  const usandoBackend = () => !!localStorage.getItem("token");

  // Cargar carrito al montar
  useEffect(() => {
    if (usandoBackend()) {
      cargarCarritoServidor();
    } else {
      cargarLocalCarrito();
    }
  }, []);

  const cargarCarritoServidor = async () => {
    try {
      const res = await API.get("/carrito");
      // asumo que res.data = { items: [...] }
      setCarrito(res.data);
    } catch (e) {
      console.error("Error cargando carrito del servidor:", e);
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
    if (usandoBackend()) {
      try {
        const res = await API.post("/carrito/items", {
          productoId: producto.id,   // el backend usa id del producto
          cantidad,
        });
        setCarrito(res.data);
      } catch (e) {
        console.error("Error agregando al carrito (backend):", e);
      }
      return;
    }

    // 🧺 Modo local (sin login)
    const existe = carrito.items.find((item) => item.id === producto.id);

    let nuevo;
    if (existe) {
      nuevo = {
        items: carrito.items.map((i) =>
          i.id === producto.id
            ? {
                ...i,
                cantidad: i.cantidad + cantidad,
                subtotal: (i.cantidad + cantidad) * i.precio,
              }
            : i
        ),
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
            subtotal: producto.precio * cantidad,
          },
        ],
      };
    }

    syncLocalStorage(nuevo);
  };

  const actualizarCantidad = async (productoId, cantidad) => {
    if (cantidad < 1) return;

    if (usandoBackend()) {
      try {
        // 👇 asumo endpoint: PUT /carrito/items/{productoId}
        const res = await API.put(`/carrito/items/${productoId}`, { cantidad });
        setCarrito(res.data);
      } catch (error) {
        console.error("Error actualizando cantidad:", error);
      }
      return;
    }

    // 🧺 Modo local
    const nuevo = {
      items: carrito.items.map((i) =>
        i.id === productoId
          ? { ...i, cantidad, subtotal: i.precio * cantidad }
          : i
      ),
    };

    syncLocalStorage(nuevo);
  };

  const eliminarDelCarrito = async (productoId) => {
    if (usandoBackend()) {
      try {
        // 👇 asumo endpoint: DELETE /carrito/items/{productoId}
        const res = await API.delete(`/carrito/items/${productoId}`);
        setCarrito(res.data);
      } catch (error) {
        console.error("Error eliminando producto:", error);
      }
      return;
    }

    // 🧺 Modo local
    const nuevo = {
      items: carrito.items.filter((item) => item.id !== productoId),
    };

    syncLocalStorage(nuevo);
  };

  const vaciarCarrito = async () => {
    if (usandoBackend()) {
      try {
        const res = await API.delete("/carrito");
        setCarrito(res.data);
      } catch (e) {
        console.error("Error vaciando carrito:", e);
      }
      return;
    }
    syncLocalStorage({ items: [] });
  };

  const checkout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    await API.post("/carrito/checkout");
    setCarrito({ items: [] });
    return true;
  };

  const cantidadTotal =
    carrito.items?.reduce((total, item) => total + item.cantidad, 0) || 0;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        checkout,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
