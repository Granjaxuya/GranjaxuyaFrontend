// src/components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProductsPage = location.pathname === '/productos';

  useEffect(() => {
    if (isProductsPage) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isProductsPage]);

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
            <a className={`nav-link ${location.pathname === "/" ? "active" : ""}`} href="/">
              Home
              <span className="underline" />
            </a>
          </li>
          <li>
            <a className={`nav-link ${isProductsPage ? "active" : ""}`} href="/productos">
              Productos
            </a>
          </li>
        </ul>

        <ul className="nav-list right">
          <li><a className="nav-link" href="/contacto">Contáctanos</a></li>
          <li><Link className="nav-link" to="/quienes-somos">¿Quiénes Somos?</Link></li>
          <li>
            <button className="cart-btn" aria-label="Carrito">
              <img
                src="/images/WhiteCart.png"
                alt="Carrito"
                width="22"
                height="22"
              />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
