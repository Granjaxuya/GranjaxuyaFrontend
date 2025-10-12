import { useState } from "react";
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^\+?\d{8,15}$/; // 8-15 dígitos, opcional prefijo +

  const validateIdentificacion = (data) => {
    const e = {};
    if (!data.nombres.trim()) e.nombres = "Requerido";
    if (!data.apellidos.trim()) e.apellidos = "Requerido";
    if (!data.telefono.trim()) e.telefono = "Requerido";
    else if (!phoneRegex.test(data.telefono.trim())) e.telefono = "Teléfono inválido";
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

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e1 = validateIdentificacion(identificacion);
    const e2 = validateEnvio(envio);
    setErrorsId(e1);
    setErrorsEnvio(e2);
    if (Object.keys(e1).length === 0 && Object.keys(e2).length === 0) {
      // hacer aquí lógica de envío de correos y confirmación del pedido
      console.log("Checkout OK", { identificacion, envio });
      alert("Tus datos fueron validados. Continuaremos con el pedido.");
    }
  };

  const departamentos = [
    "Guatemala",
  ];

  const municipiosPorDepto = {
    Guatemala: ["Guatemala", "Mixco", "Villa Nueva", "San Miguel Petapa"],
  };

  const municipios = envio.departamento && municipiosPorDepto[envio.departamento] ? municipiosPorDepto[envio.departamento] : [];

  return (
    <main className="checkout-page">
      <h1 className="checkout-title">Datos para el envío</h1><br />

      <form className="checkout-grid" onSubmit={onSubmit} noValidate>
        <section className="card">
          <h2>Identificación</h2>
          <div className="field">
            <label className="label">
              Nombres <span className="req">*</span>
              <input
                type="text"
                value={identificacion.nombres}
                onChange={(e) => setIdentificacion({ ...identificacion, nombres: e.target.value })}
                onBlur={() => setErrorsId(validateIdentificacion(identificacion))}
                placeholder=""
              />
            </label>
            {errorsId.nombres && <small className="error">{errorsId.nombres}</small>}
          </div>

          <div className="field">
            <label className="label">
              Apellidos <span className="req">*</span>
              <input
                type="text"
                value={identificacion.apellidos}
                onChange={(e) => setIdentificacion({ ...identificacion, apellidos: e.target.value })}
                onBlur={() => setErrorsId(validateIdentificacion(identificacion))}
              />
            </label>
            {errorsId.apellidos && <small className="error">{errorsId.apellidos}</small>}
          </div>

          <div className="field">
            <label className="label">
              Teléfono <span className="req">*</span>
              <input
                type="tel"
                inputMode="tel"
                value={identificacion.telefono}
                onChange={(e) => setIdentificacion({ ...identificacion, telefono: e.target.value })}
                onBlur={() => setErrorsId(validateIdentificacion(identificacion))}
                placeholder="Ej. 55551234"
              />
            </label>
            {errorsId.telefono && <small className="error">{errorsId.telefono}</small>}
          </div>

          <div className="field">
            <label className="label">
              Correo electrónico <span className="req">*</span>
              <input
                type="email"
                value={identificacion.email}
                onChange={(e) => setIdentificacion({ ...identificacion, email: e.target.value })}
                onBlur={() => setErrorsId(validateIdentificacion(identificacion))}
                placeholder="correo@ejemplo.com"
              />
            </label>
            {errorsId.email && <small className="error">{errorsId.email}</small>}
          </div>
        </section>

        <section className="card">
          <h2>Datos de envío</h2>

          <div className="field">
            <label className="label">
              Departamento <span className="req">*</span>
              <select
                value={envio.departamento}
                onChange={(e) => setEnvio({ ...envio, departamento: e.target.value, municipio: "" })}
                onBlur={() => setErrorsEnvio(validateEnvio(envio))}
              >
                <option value="">Seleccione...</option>
                {departamentos.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </label>
            {errorsEnvio.departamento && <small className="error">{errorsEnvio.departamento}</small>}
          </div>

          <div className="field">
            <label className="label">
              Municipio <span className="req">*</span>
              <select
                value={envio.municipio}
                onChange={(e) => setEnvio({ ...envio, municipio: e.target.value })}
                onBlur={() => setErrorsEnvio(validateEnvio(envio))}
                disabled={!envio.departamento}
              >
                <option value="">Seleccione...</option>
                {municipios.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
            {errorsEnvio.municipio && <small className="error">{errorsEnvio.municipio}</small>}
          </div>

          <div className="field">
            <label className="label">
              Dirección exacta <span className="req">*</span>
              <textarea
                rows={3}
                value={envio.direccion}
                onChange={(e) => setEnvio({ ...envio, direccion: e.target.value })}
                onBlur={() => setErrorsEnvio(validateEnvio(envio))}
              />
            </label>
            {errorsEnvio.direccion && <small className="error">{errorsEnvio.direccion}</small>}
          </div>

          <div className="field">
            <label className="label">
              Información extra necesaria para la entrega
              <textarea
                rows={3}
                value={envio.infoExtra}
                onChange={(e) => setEnvio({ ...envio, infoExtra: e.target.value })}
              />
            </label>
          </div>
        </section>

        <div className="actions">
          <button type="submit" className="primary">Confirmar datos y finalizar pedido</button>
        </div>
      </form>
    </main>
  );
}
