import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [editUsuario, setEditUsuario] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await axios.get("http://localhost:8081/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsuarios(res.data);
  };


  const seleccionarUsuario = (u) => {
    setEditUsuario({ ...u });
  };

  const handleInput = (e) => {
    setEditUsuario({ ...editUsuario, [e.target.name]: e.target.value });
  };

 
  const guardarCambios = async () => {
    await axios.put(`http://localhost:8081/usuarios/${editUsuario.id}`, editUsuario, {
      headers: { Authorization: `Bearer ${token}` },
    });

    cargarUsuarios();
    setEditUsuario(null);
  };


  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    await axios.delete(`http://localhost:8081/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    cargarUsuarios();
  };

  return (
    <div className="usuarios-wrapper">
      <h1 className="usuarios-title">👤 Administrar Usuarios</h1>

      <div className="usuarios-panel">

      
        <div className="usuarios-card">
          <h2>Editar Usuario</h2>

          {editUsuario ? (
            <>
              <input
                name="nombre"
                value={editUsuario.nombre}
                onChange={handleInput}
                placeholder="Nombre"
                className="usuarios-input"
              />

              <input
                name="email"
                value={editUsuario.email}
                onChange={handleInput}
                placeholder="Email"
                className="usuarios-input"
              />

              <input
                name="roles"
                value={editUsuario.roles}
                onChange={handleInput}
                placeholder="Rol (ADMIN / USER)"
                className="usuarios-input"
              />

              <button className="btn btn-primary" onClick={guardarCambios}>
                Guardar
              </button>
              <button className="btn btn-cancel" onClick={() => setEditUsuario(null)}>
                Cancelar
              </button>
            </>
          ) : (
            <p className="hint">Selecciona un usuario de la lista para editarlo</p>
          )}
        </div>

    
        <div className="usuarios-card">
          <h2>Lista de Usuarios</h2>

          <ul className="usuarios-list">
            {usuarios.map((u) => (
              <li key={u.id} className="usuarios-item">
                <span>
                  {u.nombre} — <small>{u.email}</small>
                </span>

                <div>
                  <button className="btn btn-secondary" onClick={() => seleccionarUsuario(u)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => eliminarUsuario(u.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button onClick={() => navigate("/")} className="btn btn-secondary">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;
