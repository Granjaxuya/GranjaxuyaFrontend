import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import './index.css';
import About from './pages/AboutUs/AboutUs'
function AfterHeroFill() {
  const location = useLocation();
  if (location.pathname !== '/') return null;
  return <section className="after-hero-fill" aria-hidden="true" />;
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/quienes" element={<About />} />
        </Routes>
        <AfterHeroFill />
      </Router>
    </>
  );
}

export default App;
