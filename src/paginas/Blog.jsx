import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import RecetasCard from '../componentes/RecetasCard';
import { recetas as recetasIniciales } from '../data/Recetas';

function Blog() {
  const [recetas, setRecetas] = useState([]);
  
  useEffect(() => {
    const recetasPersonalizadas = JSON.parse(localStorage.getItem('recetasPersonalizadas') || '[]');
    const todasLasRecetas = [...recetasIniciales, ...recetasPersonalizadas];
    setRecetas(todasLasRecetas.reverse()); 
  }, []);
  return (
    <>
      <Header />
      <main>
        <div style={{ padding: '20px 5%' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#38761D', marginBottom: '30px', borderBottom: '3px solid #FFC107', paddingBottom: '10px' }}>
            Blog de Recetas HuertoHogar
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '40px', color: '#555' }}>
            Encuentra inspiración para cocinar de forma saludable con nuestros productos orgánicos.
          </p>
          
          <div className="lista-recetas" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {recetas.map((receta) => (
              <RecetasCard key={receta.id} receta={receta} />
            ))}
          </div>
        </div>
      </main>
      <Informacion />
      <Footer />
    </>
  );
}

export default Blog;