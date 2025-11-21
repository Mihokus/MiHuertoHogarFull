
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Login from './paginas/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} /> 
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;