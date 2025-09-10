// src/components/Hero/Hero.jsx
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero" role="banner" aria-label="Granja Xuya - Huevos frescos">
      <div className="hero-inner container">
        <div className="hero-copy">
          <h1 className="hero-title">Granja Xuya</h1>
          <p className="hero-subtitle">Huevos frescos</p>
          <p className="hero-tagline">
            Producidos con amor y respeto por la naturaleza
          </p>
        </div>
      </div>
    </section>
  );
}
