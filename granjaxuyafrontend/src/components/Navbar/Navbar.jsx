// src/components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isProductsPage = location.pathname === "/productos";

  useEffect(() => {
    if (isProductsPage) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isProductsPage]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

        {/* Botón menú (solo visible en móvil) */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="menu-icon">{menuOpen ? "✖" : "☰"}</span>
        </button>

        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list left">
            <li>
              <a
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${isProductsPage ? "active" : ""}`}
                href="/productos"
              >
                Productos
              </a>
            </li>
          </ul>

          <ul className="nav-list right">
            <li>
              <a
                className={`nav-link ${location.pathname === "/contacto" ? "active" : ""}`}
                href="/contacto"
              >
                Contáctanos
              </a>
            </li>
            <li>
              <Link
                className={`nav-link ${location.pathname === "/quienes-somos" ? "active" : ""}`}
                to="/quienes-somos"
              >
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              <button className="cart-btn" aria-label="Carrito" onClick={onCartClick}>
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
        </div>

      </nav>
    </header>
  );
}
