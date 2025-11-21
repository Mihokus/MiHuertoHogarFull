
import React from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import Producto from '../componentes/Producto';
import { productos } from '../data/Productos'; 

function Catalogo() {
  return (
    <>
      <Header />
      <main>
        <h2>Catálogo</h2>
       <div className='lista-productos'>
        {productos.map((producto) => (
          <Producto key={producto.codigo} producto={producto} isDestacado={false} />
        ))}
        </div>
      </main>
      <Informacion />
      <Footer />
    </>
  );
}

export default Catalogo;