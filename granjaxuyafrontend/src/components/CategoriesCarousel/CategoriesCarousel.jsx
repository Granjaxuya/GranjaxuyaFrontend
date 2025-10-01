import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategoriesCarousel.css";

// De momento son datos quemados a reemplazarse por los de la base de datos
const categories = [
  { id: 1, name: "Huevos XL", img: "/images/cat3.png" },
  { id: 2, name: "Huevos Orgánicos", img: "/images/cat3.png" },
  { id: 3, name: "Huevos de Campo", img: "/images/cat3.png" },
  { id: 4, name: "Lácteos", img: "/images/cat2.png" },
  { id: 5, name: "Frutas y Verduras", img: "/images/cat1.png" },
  { id: 6, name: "Otros Productos", img: "/images/cat1.png" },
  { id: 7, name: "Otros Productos", img: "/images/cat1.png" },
  { id: 8, name: "Otros Productos", img: "/images/cat1.png" },
  { id: 9, name: "Otros Productos", img: "/images/cat1.png" },
];

export default function CategoriesCarousel() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // muestra 3 tarjetas por slide
    slidesToScroll: 3,
    customPaging: () => <span className="custom-dot" />,
    appendDots: dots => <ul className="custom-dots">{dots}</ul>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section id="categories" className="categories-section">
      <h2 className="section-title">Nuestros Productos</h2>

      {/* wrapper para evitar el desbordamiento del contenido */}
      <div className="categories-slider">
        <Slider {...settings}>
          {categories.map(cat => (
            <div key={cat.id}>
              <div className="category-card">
                <img src={cat.img} alt={cat.name} />
                <p>{cat.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="categories-cta">
        <a className="btn" href="/productos">Ver todos los productos</a>
      </div>
    </section>
  );
}