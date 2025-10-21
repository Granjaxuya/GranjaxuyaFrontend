import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategoriesCarousel.css";

const categories = [
  { id: 1, name: "Cartón Pequeño", img: "/images/cat3.png" },
  { id: 2, name: "Cartón Mediano", img: "/images/cat3.png" },
  { id: 3, name: "Cartón Grande", img: "/images/cat3.png" },
  { id: 4, name: "Cartón Jumbo", img: "/images/cat3.png" },
  { id: 5, name: "Cartón Extra Jumbo", img: "/images/cat3.png" },
];

export default function CategoriesCarousel() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    customPaging: () => <span className="custom-dot" />,
    appendDots: dots => <ul className="custom-dots">{dots}</ul>,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 735,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "0px", 
        },
      },
    ],
  };

  return (
    <section id="categories" className="categories-section">
      <h2 className="section-title">Nuestros Productos</h2>

      {/* wrapper para evitar el desbordamiento del contenido */}
      <div className="categories-slider">
        <Slider key={window.innerWidth < 735 ? "mobile" : "desktop"} {...settings}>
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