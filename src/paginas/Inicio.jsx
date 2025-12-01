import React, { useEffect, useState } from 'react';
import Footer from '../componentes/Footer';
import Informacion from '../componentes/Informacion';
import Producto from '../componentes/Producto';
import axios from "axios";

function Inicio() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/productos");
        const productos = res.data;

        
        setDestacados(productos.slice(0, 5));

      } catch (error) {
        console.log("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <main>

      
        <section className="Eslo">
          <h2>Frescura del campo a tu mesa</h2>
          <p>Disfruta de productos frescos, orgánicos y sostenibles</p>
        </section>

      
        <section className="banner-oferta">
          <h2 className="titulo-central"> PRODUCTOS DESTACADOS</h2>
          <p>Productos mas vendidos dentro de la semana</p>

          <div className="ofertas-scroll">
            {destacados.map(producto => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

      </main>

      <Informacion />
      <Footer />
    </>
  );
}

export default Inicio;
