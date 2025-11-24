import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario || !usuario.roles?.includes("ADMIN")) {
      navigate("/");
      return;
    }

    // Traer productos
    axios.get("http://localhost:8081/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.log(err));

    // Traer categorías
    axios.get("http://localhost:8081/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.log(err));
  }, [navigate]);

  const handleCrear = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !precio || !categoriaId) {
      setMensaje("Completa todos los campos");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/productos",
        { nombre, precio: parseFloat(precio), categoriaId: parseInt(categoriaId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProductos([...productos, response.data]);
      setMensaje("Producto creado!");
      setNombre("");
      setPrecio("");
      setCategoriaId("");
    } catch (err) {
      setMensaje("Error: no tienes permisos o faltan datos");
      console.log(err);
    }
  };

  return (
    <div id="forms-container">
      <div id="register-form">
        <h2>Administrar Productos</h2>
        <form onSubmit={handleCrear}>
          <label>Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
          />

          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
          />

          <label>Categoría</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="">Selecciona categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>

          <button type="submit">Crear Producto</button>
        </form>

        {mensaje && (
          <p style={{ textAlign: "center", color: mensaje.includes("Error") ? "red" : "green" }}>
            {mensaje}
          </p>
        )}

        <h3>Productos existentes</h3>
        <ul>
          {productos.map(p => (
            <li key={p.id}>{p.nombre} - ${p.precio}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminProductos;
