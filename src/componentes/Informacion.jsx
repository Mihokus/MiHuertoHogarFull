
import React from 'react';
function InfoSection() {
  return (
    <section className="infoPrincipal">
      <section className="infoMapa">
        <h2>Nuestras Ubicaciones</h2>
        <section className="mapacontenido">
          <ul className="ciudades">
            <li>Santiago</li>
            <li>Puerto Montt</li>
            <li>Villarica</li>
            <li>Nacimiento</li>
            <li>Viña del Mar</li>
            <li>Valparaíso</li>
            <li>Concepción</li>
          </ul>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75323.29856934809!2d-70.73417082069432!3d-33.453189561935574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1757381053475!5m2!1ses!2scl"
            width="400" height="200" style={{borderRadius:'14px', border:'1px solid'}}
            title="Mapa de Ubicaciones"
          ></iframe>
        </section>
      </section>
      <section className="infoLateral">
        <section className="ventajas">
          <h2>¿Por qué elegir HuertoHogar?</h2>
          <ul>
            <li>Productos 100% frescos y orgánicos</li>
            <li>Envíos rápidos a todo Chile</li>
            <li>Atención personalizada</li>
            <li>Precios justos y ofertas semanales</li>
          </ul>
        </section>
        <section className="testimonios">
          <h2>Lo que dicen nuestros clientes</h2>
          <section className="testimoniosLista">
            <blockquote>
              “¡Excelente calidad y atención! Las frutas llegaron fresquísimas.”<br/>
              <span>- Camila, Santiago</span>
            </blockquote>
            <blockquote>
              “Me encanta la variedad y los precios. ¡Recomendado!”<br/>
              <span>- Juan, Concepción</span>
            </blockquote>
          </section>
        </section>
      </section>
    </section>
  );
}

export default InfoSection;