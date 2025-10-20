import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Confirmation.css";

const Confirmation = () => {
  return (
    <div className="confirmation-page">
      <Navbar /> {/* ✅ Navbar con fondo oscuro */}
      <main className="confirmation-container">
        <div className="confirmation-card">
          <div className="icon">✅</div>
          <h2>Compra finalizada</h2>
          <p>
            Tu pedido fue enviado exitosamente. Hemos enviado un correo con los
            detalles del pedido y la confirmación al email proporcionado.
          </p>
          <p>
            Gracias por confiar en <strong>Granja Xuya 🐔</strong>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
