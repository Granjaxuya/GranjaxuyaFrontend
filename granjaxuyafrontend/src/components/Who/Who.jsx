
import './Who.css';
import MissionVision from '../MissionVision/MissionVision';
export default function Who() {
  return (
    <>
    
    <section id="home" className="who" role="banner" aria-label="Granja Xuya - Huevos frescos">
      <div className="who-inner container">
        <div className="who-copy">
          <h1 className="who-title">¿Quienes Somos?</h1>
          <p className="who-tagline">
            Somos una pequeña granja familiar enfocada en la producción de huevos de manera sostenible. En Granja Xuya creemos que la calidad no solo se refleja en el producto final, sino también en cómo cuidamos a nuestras gallinas, cómo manejamos los recursos y cómo trabajamos en armonía con la naturaleza. 
          </p>
        </div>
      </div>
    </section>
    <MissionVision />
    </>
  );
}
