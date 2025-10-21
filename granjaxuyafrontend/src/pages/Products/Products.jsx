import { useState, useEffect } from "react";
import "./Products.css";
import ProductModal from "./ProductModal";

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const addToCart = (product) => {
    onAddToCart(product);
    setSelectedProduct(null);
  };

  const sortBy = (type) => setSortType(type);

  let displayedProducts = [...products];
  if (sortType === "name") displayedProducts.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortType === "price") displayedProducts.sort((a, b) => a.price - b.price);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <section className="products-section">
      <h2 className="products-title">Nuestros Productos</h2>

      <div className="filters">
        <div
          className="filter"
          onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
        >
          Ordenar por ▼
          {openDropdown === "sort" && (
            <ul className="dropdown">
              <li onClick={() => sortBy("name")}>Nombre</li>
              <li onClick={() => sortBy("price")}>Precio</li>
            </ul>
          )}
        </div>
      </div>

      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            {/* imagen o click general abre el modal */}
            <div className="product-content" onClick={() => setSelectedProduct(product)}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">Q{product.price.toFixed(2)}</p>
            </div>

            {/* overlay para hover */}
            <div className="overlay">
              <button onClick={() => addToCart(product)}>🛒 Agregar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal lateral */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(displayedProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </section>
  );
}
