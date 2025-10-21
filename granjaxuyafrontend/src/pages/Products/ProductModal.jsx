// src/pages/Products/ProductModal.jsx
import "./ProductModal.css";

function formatDescription(text) {
  const match = text.match(/\(≈\s*[^)]+\)/);
  const weight = match ? match[0] : "";
  const clean = text.replace(match, "").trim();
  const parts = clean.split(". ").filter(Boolean);

  const EggIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon-egg"
    >
      <path
        fill="currentColor"
        d="M12 2C8.13 2 4 8 4 13s3.13 9 8 9s8-4 8-9s-4.13-11-8-11Z"
      />
    </svg>
  );

  return (
    <div className="modal-description">
      {weight && (
        <p className="modal-weight">
          <EggIcon />
          <strong>Peso:</strong> {weight.replace(/[()]/g, "")}
        </p>
      )}

      {parts.map((part, index) => (
        <p key={index} className="modal-line">
          <EggIcon />
          {part.trim().endsWith(".") ? part.trim() : `${part.trim()}.`}
        </p>
      ))}
    </div>
  );
}

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()} // evita que el click cierre el modal
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <img
            src={product.image}
            alt={product.title}
            className="modal-product-image"
          />
          <h2 className="modal-title">{product.title}</h2>
          <p className="modal-description">{formatDescription(product.description)}</p>
          <p className="modal-price">Q{product.price.toFixed(2)}</p>
          <button className="modal-add-btn" onClick={() => onAddToCart(product)}>
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
