import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import './index.css';
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="after-hero-fill" aria-hidden="true" />
    </>
  );
}

export default App;
