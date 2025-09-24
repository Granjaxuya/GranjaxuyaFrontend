import React from "react";
import "./Contact.css";

const Contact= ({ title, icon, text }) => {
  return (
    <div className="contact-card">
      <h3>{title}</h3>
      <div className="contact-icon">{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default Contact;
