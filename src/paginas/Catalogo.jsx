import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

function Catalogo() {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [orden, setOrden] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8082/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const url = categoriaSeleccionada
          ? `http://localhost:8082/productos?categoriaId=${categoriaSeleccionada}`
          : `http://localhost:8082/productos`;

        const res = await axios.get(url);

        let lista = [...res.data];

        if (orden === "menor") lista.sort((a, b) => a.precio - b.precio);
        if (orden === "mayor") lista.sort((a, b) => b.precio - a.precio);

        setProductos(lista);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar los productos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaSeleccionada, orden]);

  if (loading) return <p className="catalogo-loading">Cargando productos...</p>;
  if (error) return <p className="catalogo-error">{error}</p>;

  return (
    <div className="catalogo-container">

      <h2 className="catalogo-title">Catálogo de Productos</h2>

      <div className="filtros-container">
      
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="catalogo-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>

       
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="catalogo-select"
        >
          <option value="">↕ Ordenar por precio</option>
          <option value="menor">⬇ Menor a mayor</option>
          <option value="mayor">⬆ Mayor a menor</option>
        </select>
      </div>

 
      <div className="catalogo-grid">
        {productos.map((prod) => (
          <div key={prod.id} className="producto-card">
            <img
              className="producto-img"
              src={prod.imagenUrl}
              alt={prod.nombre}
              onClick={() => navigate(`/producto/${prod.codigo}`)}
            />

            <div className="producto-info">
              <h4>{prod.nombre}</h4>
              <p className="producto-precio">${prod.precio}</p>
              <p className={`producto-stock ${prod.stock === 0 ? "agotado" : ""}`}>
                {prod.stock > 0 ? `Stock: ${prod.stock}` : "Agotado"}
              </p>

              <button
                className="btn-agregar"
                disabled={prod.stock === 0}
                onClick={() => agregarAlCarrito(prod)}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <p className="mensaje-vacio">No existen productos de esta categoria</p>
      )}
    </div>
  );
}

export default Catalogo;
