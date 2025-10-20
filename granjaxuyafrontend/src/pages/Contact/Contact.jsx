import React from "react";
import ContactCard from "../../components/Contact/Contact";
import "./Contact.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>
      <div className="contact-grid">
        <ContactCard title="Whatsapp" icon={<FaWhatsapp />} text="+502 3044 0927" link="https://wa.me/50230440927" />
        <ContactCard title="Instagram" icon={<FaInstagram />} text="@GranjaXuya" link="https://instagram.com/GranjaXuya" />
        <ContactCard title="Facebook" icon={<FaFacebook />} text="Granja Xuya" link="https://facebook.com/GranjaXuya.2024"/>
        <ContactCard title="TikTok" icon={<FaTiktok />} text="Granja Xuya" link="https://www.tiktok.com/@granjaxuya" />
      </div>
    </div>
  );
};

export default Contact;
