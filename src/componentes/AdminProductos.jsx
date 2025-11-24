import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProductos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [formCrear, setFormCrear] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    stock: "",
    unidad: "",
    descripcion: "",
    imagenUrl: "",
    categoriaId: ""
  });

  const [formEditar, setFormEditar] = useState(null);

  // Protección de acceso
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:8081/productos", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProductos(res.data))
    .catch(() => navigate("/login"));

    axios.get("http://localhost:8081/categorias", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCategorias(res.data))
    .catch(() => navigate("/login"));

  }, [token, navigate]);


  const handleCrearInput = (e) => {
    setFormCrear({ ...formCrear, [e.target.name]: e.target.value });
  };

  const handleCrear = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8081/productos", formCrear, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProductos([...productos, response.data]);

    setFormCrear({
      codigo: "",
      nombre: "",
      precio: "",
      stock: "",
      unidad: "",
      descripcion: "",
      imagenUrl: "",
      categoriaId: ""
    });
  };


  const seleccionarParaEditar = (producto) => {
    setFormEditar(producto);
  };

  const handleEditarInput = (e) => {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
  };

  const handleEditar = async () => {
    const response = await axios.put(
      `http://localhost:8081/productos/${formEditar.id}`,
      formEditar,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProductos(productos.map(p => p.id === formEditar.id ? response.data : p));
    setFormEditar(null);
  };


  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    await axios.delete(`http://localhost:8081/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProductos(productos.filter(p => p.id !== id));
  };


  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Panel de Productos</h1>

      <div className="admin-container">


      
        <div className="admin-card">
          <h2 className="admin-card-title">Agregar Producto</h2>
          <form onSubmit={handleCrear} className="admin-form">

            {Object.keys(formCrear).map((key) =>
              key !== "categoriaId" ? (
                <input
                  key={key}
                  name={key}
                  value={formCrear[key]}
                  onChange={handleCrearInput}
                  placeholder={key.toUpperCase()}
                  className="admin-input"
                />
              ) : null
            )}

            <select
              name="categoriaId"
              value={formCrear.categoriaId}
              onChange={handleCrearInput}
              className="admin-input"
              required
            >
              <option value="">Seleccionar Categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <button className="btn btn-primary" type="submit">Guardar</button>
          </form>
        </div>




        <div className="admin-card">
          <h2 className="admin-card-title">Editar Producto</h2>

          {formEditar === null ? (
            <ul className="admin-list">
              {productos.map((p) => (
                <li key={p.id} className="admin-item">
                  <span>{p.nombre}</span>
                  <button className="btn btn-secondary" onClick={() => seleccionarParaEditar(p)}>Editar</button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h3 className="admin-edit-label">Editando: {formEditar.nombre}</h3>

              <input name="nombre" value={formEditar.nombre} onChange={handleEditarInput} className="admin-input" />
              <input name="precio" value={formEditar.precio} onChange={handleEditarInput} className="admin-input" />
              <input name="stock" value={formEditar.stock} onChange={handleEditarInput} className="admin-input" />

              <button className="btn btn-primary" onClick={handleEditar}>Actualizar</button>
              <button className="btn btn-cancel" onClick={() => setFormEditar(null)}>Cancelar</button>
            </>
          )}
        </div>



      
        <div className="admin-card">
          <h2 className="admin-card-title">Eliminar Producto</h2>
          <ul className="admin-list">
            {productos.map((p) => (
              <li key={p.id} className="admin-item">
                <span>{p.nombre}</span>
                <button className="btn btn-danger" onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <button className="btn btn-secondary" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>

      </div>
    </div>
  );
}

export default AdminProductos;
