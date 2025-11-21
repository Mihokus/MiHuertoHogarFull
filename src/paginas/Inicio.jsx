import React from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import Producto from '../componentes/Producto';
import { getDestacados } from '../data/Productos';

function Inicio() {
  const destacados = getDestacados();

  return (
    <>
      <Header />
      <main>
        <section className="Eslo">
          <h2>Frescura del campo a tu mesa</h2>
          <p>Disfruta de productos frescos, orgánicos y sostenibles en HuertoHogar</p>
        </section>
        
        <section className="banner-oferta">
          <img src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-9950-61fd-8dc0-71e69afe423d/raw?se=2025-09-12T02%3A05%3A11Z&sp=r&sv=2024-08-04&sr=b&scid=b70ed826-40b0-5432-babb-3e7e48af2c31&skoid=864daabb-d06a-46b3-a747-d35075313a83&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-11T21%3A59%3A23Z&ske=2025-09-12T21%3A59%3A23Z&sks=b&skv=2024-08-04&sig=Dpbn8D1s/A21s1qtZR6%2BW3YRd6SLRKgdVD2f%2BTkIjfQ%3D" alt="Oferta de la semana" />
          <h2>¡Oferta de la Semana!</h2>
          <p>Descuentos especiales en frutas y verduras seleccionadas</p>
        </section>

        <section className="destacados">
          <h2>Productos Destacados</h2>
          <div className="filtroProducto">
            {destacados.map((producto) => (
              <Producto key={producto.codigo} producto={producto} isDestacado={true} />
            ))}
          </div>
        </section>
        
        <section className="blog">
          <h2>Blog HuertoHogar</h2>
          <div className="blog-externo">
            <iframe 
              src="https://snackclub.cl/blog/" 
              width="100%" height="400" 
              style={{borderRadius:'16px', border:'1px solid #ccc'}}
              title="Blog Externo"
            ></iframe>
          </div>
        </section>
      </main>
      <Informacion />
      <Footer />
    </>
  );
}

export default Inicio;