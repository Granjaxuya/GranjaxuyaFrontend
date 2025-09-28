import './MissionVision.css';

export default function MissionVision() {
  return (
    <section className="container"><br />
      <div className="mv-cards">
        <article className="mv-card" aria-labelledby="mv-mision">
          <h2 id="mv-mision" className="mv-card-title">Misión</h2>
          <p className="mv-card-text">
          Producir huevos de la más alta calidad mediante el uso de prácticas avícolas responsables y sostenibles, garantizando el bienestar de nuestras gallinas, la seguridad de nuestros productos y el respeto al medio ambiente.
          Nos esforzamos por ser un modelo de bioseguridad y eficiencia, asegurando que cada huevo que llega a nuestros consumidores sea fresco y nutritivo.
          </p>
        </article>
        <article className="mv-card" aria-labelledby="mv-vision">
          <h2 id="mv-vision" className="mv-card-title">Visión</h2>
          <p className="mv-card-text">
          Ser la empresa líder en la producción avícola en Guatemala, reconocida por nuestro compromiso con la calidad, la innovación y el bienestar animal, promoviendo prácticas sostenibles que contribuyan al desarrollo económico y la seguridad alimentaria de la región, mientras generamos productos de alta calidad que satisfacen las necesidades nutricionales de las familias guatemaltecas.
          </p>
        </article>
      </div>
    </section>
  );
}
