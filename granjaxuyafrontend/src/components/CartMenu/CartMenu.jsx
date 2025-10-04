import { useState } from "react";
import "./CartMenu.css";

export default function CartMenu({ isOpen, onClose }) {
  const [items, setItems] = useState([
    { id: 1, name: "Huevos Orgánicos", price: 25, quantity: 1 },
  ]);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ));
  };

  return (
    <div className={`cart-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div className="cart-menu" onClick={(e) => e.stopPropagation()}>
        <header className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty">Tu carrito está vacío</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <p>Q{item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="checkout-btn">Finalizar Compra</button>
      </div>
    </div>
  );
}
