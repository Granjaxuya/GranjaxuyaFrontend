import React from "react";
import ContactCard from "../../components/Contact/Contact";
import "./Contact.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>
      <div className="contact-grid">
        <ContactCard title="Whatsapp" icon={<FaWhatsapp />} text="+502 1234 5678" />
        <ContactCard title="Instagram" icon={<FaInstagram />} text="@GranjaXuya" />
        <ContactCard title="Facebook" icon={<FaFacebook />} text="Granja Xuya" />
        <ContactCard title="TikTok" icon={<FaTiktok />} text="Granja Xuya" />
      </div>
    </div>
  );
};

export default Contact;
