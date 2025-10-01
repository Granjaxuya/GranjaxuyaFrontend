// src/components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav container" aria-label="Principal">
        <a href="/" className="brand" aria-label="Inicio Granja Xuya">
          <img
            src="/images/Logo.png"
            alt="Granja Xuya"
            className="brand-img"
          />
        </a>

        <ul className="nav-list left">
          <li>
            <a className="nav-link active" href="/">
              Home
              <span className="underline" />
            </a>
          </li>
          <li><a className="nav-link" href="#productos">Productos</a></li>
        </ul>

        <ul className="nav-list right">
          <li><a className="nav-link" href="/contacto">Contáctanos</a></li>
          <li><Link className="nav-link" to="/quienes-somos">¿Quiénes Somos?</Link></li>
          <li>
            <button className="cart-btn" aria-label="Carrito">
              <img
                src="/images/WhiteCart.png"
                alt=""
                width="22"
                height="22"
              />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
