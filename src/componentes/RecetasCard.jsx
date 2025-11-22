import React from 'react';

function RecetasCard({ receta }) {
  return (
    <article style={{
      backgroundColor: 'var(--color-card)',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      transition: 'transform 0.3s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img 
        src={receta.imagenUrl} 
        alt={receta.titulo} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '20px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', marginBottom: '10px' }}>
          {receta.titulo}
        </h3>
        <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '15px' }}>
          Publicado el {receta.fecha}
        </p>
        <p style={{ marginBottom: '20px' }}>
          {receta.resumen}
        </p>
      
        <button style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text)',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Ver Receta Completa
        </button>
      </div>
    </article>
  );
}

export default RecetasCard;