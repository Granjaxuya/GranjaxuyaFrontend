import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importar páginas
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import Checkout from "./pages/Checkout/Checkout";

// Importar Navbar
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartMenu from "./components/CartMenu/CartMenu";

function App() {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  
    // 🔹 Función global para agregar productos al carrito
  const addItem = (newItem) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.title === newItem.title);
      if (existing) {
        // Si ya existe, aumenta la cantidad
        return prevItems.map((i) =>
          i.title === newItem.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Si es nuevo, lo agrega al carrito
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // 🔹 Contador total de ítems (para Navbar)
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={totalQuantity} onCartClick={() => setIsCartOpen(true)}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products onAddToCart={addItem} />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/quienes-somos" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      <CartMenu isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={items} setItems={setItems} />
    </Router>
  );
}

export default App;
