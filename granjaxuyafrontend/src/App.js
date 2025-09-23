import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import './index.css';
import About from './pages/AboutUs/AboutUs'
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/quienes" element={<About />} />
      </Routes>
    </Router>
      <section className="after-hero-fill" aria-hidden="true" />      
    </>
  );
}

export default App;
