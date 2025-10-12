import { useState } from "react";
import "./Products.css";

const sampleProducts = [
  { id: 1, title: "Cartón de huevos mediano", price: 33, image: "/images/cat1.png" },
  { id: 2, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 3, title: "Cartón de huevos grande", price: 40, image: "/images/cat2.png" },
  { id: 4, title: "Cartón de huevos grande", price: 40, image: "/images/cat3.png" },
  { id: 5, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 6, title: "Cartón de huevos grande", price: 40, image: "/images/cat3.png" },
  { id: 7, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 8, title: "Cartón de huevos grande", price: 40, image: "/images/cat2.png" },
  { id: 9, title: "Queso fresco", price: 40, image: "/images/cat3.png" },
  { id: 10, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 11, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 12, title: "Cartón de huevos grande", price: 40, image: "/images/cat1.png" },
  { id: 13, title: "Cartón de huevos jumbo", price: 40, image: "/images/cat1.png" },
  { id: 14, title: "Leche entera", price: 40, image: "/images/cat1.png" },
  { id: 15, title: "Caja de uvas", price: 40, image: "/images/cat1.png" },
];

export default function Products({ onAddToCart  }) {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [sortType, setSortType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const addToCart = (product) => {
    onAddToCart(product); 
  };

  const sortBy = (type) => {
    setSortType(type);
  };

  let displayedProducts = [...sampleProducts];
  if (sortType === "name") {
    displayedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === "price") {
    displayedProducts.sort((a, b) => a.price - b.price);
  }


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <section className="products-section">
      <h2 className="products-title">Nuestros Productos</h2>

      <div className="filters">
        <div className="filter" onClick={() => setOpenDropdown(openDropdown === "filter" ? null : "filter")}>
          Filtrar +
          {openDropdown === "filter" && (
            <ul className="dropdown">
              <li>Huevos XL</li>
              <li>Huevos Orgánicos</li>
              <li>Huevos de Campo</li>
              <li>Lácteos</li>
              <li>Frutas y Verduras</li>
              <li>Otros Productos</li>
            </ul>
          )}
        </div>

        <div className="filter" onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}>
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
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">Q{product.price}.00</p>
            <div className="overlay">
                <button onClick={() => addToCart(product)}>🛒 Agregar</button>
            </div>
            </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(displayedProducts.length / productsPerPage) }, (_, i) => (
            <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
            >
            {i + 1}
            </button>
        ))}
      </div>

    </section>
  );
}