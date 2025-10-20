import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const [identificacion, setIdentificacion] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
  });
  const [envio, setEnvio] = useState({
    departamento: "",
    municipio: "",
    direccion: "",
    infoExtra: "",
  });

  const [errorsId, setErrorsId] = useState({});
  const [errorsEnvio, setErrorsEnvio] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^\+?\d{8,15}$/;

  const validateIdentificacion = (data) => {
    const e = {};
    if (!data.nombres.trim()) e.nombres = "Requerido";
    if (!data.apellidos.trim()) e.apellidos = "Requerido";
    if (!data.telefono.trim()) e.telefono = "Requerido";
    else if (!phoneRegex.test(data.telefono.trim()))
      e.telefono = "Teléfono inválido";
    if (!data.email.trim()) e.email = "Requerido";
    else if (!emailRegex.test(data.email.trim())) e.email = "Correo inválido";
    return e;
  };

  const validateEnvio = (data) => {
    const e = {};
    if (!data.departamento) e.departamento = "Requerido";
    if (!data.municipio) e.municipio = "Requerido";
    if (!data.direccion.trim()) e.direccion = "Requerido";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e1 = validateIdentificacion(identificacion);
    const e2 = validateEnvio(envio);
    setErrorsId(e1);
    setErrorsEnvio(e2);

    if (Object.keys(e1).length !== 0 || Object.keys(e2).length !== 0) return;

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
      alert("El carrito se encuentra actualmente vacío");
      return;
    }

    const ordenEnvio = {
      identificacion,
      envio,
      productos: cartItems,
    };

    try {
      setLoading(true);
      //const API_URL = "http://localhost:3000";
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ordenEnvio),
      });

      if (!resp.ok) throw new Error("Error al enviar el pedido");

      // ✅ Redirigir a la página de confirmación
      localStorage.removeItem("cartItems"); // Limpia el carrito
      navigate("/confirmacion"); // Manda al usuario a la nueva pantalla

    } catch (err) {
      console.error("Error al enviar pedido:", err);
      alert("Ocurrió un error al enviar tu pedido. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const departamentos = ["Guatemala"];
  const municipiosPorDepto = {
    Guatemala: ["Guatemala", "Mixco", "Villa Nueva", "San Miguel Petapa"],
  };
  const municipios =
    envio.departamento && municipiosPorDepto[envio.departamento]
      ? municipiosPorDepto[envio.departamento]
      : [];

  return (
    <main className="checkout-page">
      <h1 className="checkout-title">Datos para el envío</h1>
      <form className="checkout-grid" onSubmit={onSubmit} noValidate>
        <section className="card">
          <h2>Identificación</h2>
          <label className="checkout-label">
            Nombres:
            <input
              type="text"
              value={identificacion.nombres}
              onChange={(e) =>
                setIdentificacion({
                  ...identificacion,
                  nombres: e.target.value,
                })
              }
            />
            {errorsId.nombres && <small>{errorsId.nombres}</small>}
          </label>
          <label className="checkout-label">
            Apellidos:
            <input
              type="text"
              value={identificacion.apellidos}
              onChange={(e) =>
                setIdentificacion({
                  ...identificacion,
                  apellidos: e.target.value,
                })
              }
            />
            {errorsId.apellidos && <small>{errorsId.apellidos}</small>}
          </label>
          <label className="checkout-label">
            Teléfono:
            <input
              type="text"
              value={identificacion.telefono}
              onChange={(e) =>
                setIdentificacion({
                  ...identificacion,
                  telefono: e.target.value,
                })
              }
            />
            {errorsId.telefono && <small>{errorsId.telefono}</small>}
          </label>
          <label className="checkout-label">
            Correo electrónico:
            <input
              type="email"
              value={identificacion.email}
              onChange={(e) =>
                setIdentificacion({
                  ...identificacion,
                  email: e.target.value,
                })
              }
            />
            {errorsId.email && <small>{errorsId.email}</small>}
          </label>
        </section>

        <section className="card">
          <h2>Datos de envío</h2>
          <label className="checkout-label">
            Departamento:
            <select
              value={envio.departamento}
              onChange={(e) =>
                setEnvio({ ...envio, departamento: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              {departamentos.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            {errorsEnvio.departamento && <small>{errorsEnvio.departamento}</small>}
          </label>

          <label className="checkout-label">
            Municipio:
            <select
              value={envio.municipio}
              onChange={(e) =>
                setEnvio({ ...envio, municipio: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              {municipios.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            {errorsEnvio.municipio && <small>{errorsEnvio.municipio}</small>}
          </label>

          <label className="checkout-label">
            Dirección:
            <input
              type="text"
              value={envio.direccion}
              onChange={(e) =>
                setEnvio({ ...envio, direccion: e.target.value })
              }
            />
            {errorsEnvio.direccion && <small>{errorsEnvio.direccion}</small>}
          </label>

          <label className="checkout-label">
            Información adicional:
            <textarea
              value={envio.infoExtra}
              onChange={(e) =>
                setEnvio({ ...envio, infoExtra: e.target.value })
              }
            ></textarea>
          </label>
        </section>

        <button type="submit" className="checkout-btn" disabled={loading}>
          {loading ? "Enviando..." : "Confirmar pedido"}
        </button>
      </form>
    </main>
  );
}
