import { useState } from "react";
import "./CartMenu.css";

export default function CartMenu({ isOpen, onClose }) {
  const [items, setItems] = useState([
    { id: 1, name: "Huevos Orgánicos", price: 25, quantity: 1 },
  ]);

  // ➕ Función para agregar productos distintos
  const addItem = (newItem) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === newItem.id);
      if (existing) {
        // Si ya existe, aumenta cantidad
        return prevItems.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Si es nuevo, lo agrega al listado
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ));
  };

  // 💰 Calcular total
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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

        {/* Botón inferior con total */}
        {items.length > 0 && (
          <button className="checkout-btn">
            Continuar con la compra – Q{total.toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
}
