import React from "react";
import "./Contact.css";

const Contact = ({ title, icon, text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <h3>{title}</h3>
      <div className="contact-icon">{icon}</div>
      <p>{text}</p>
    </a>
  );
};

export default Contact;
