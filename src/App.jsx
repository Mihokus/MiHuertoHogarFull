
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Login from './paginas/Login';
import DetalleProducto from './paginas/DetalleProducto';
import Blog from './paginas/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} /> 
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:codigo" element={<DetalleProducto />} />
        <Route path="/blog" element={<Blog />}/>
      </Routes>
    </Router>
  );
}

export default App;