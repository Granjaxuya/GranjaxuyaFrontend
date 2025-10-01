import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importar páginas
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";

// Importar Navbar
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {

  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/quienes-somos" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
