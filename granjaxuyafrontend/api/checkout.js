
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { identificacion, envio, productos } = req.body || {};
    if (!identificacion || !envio || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "Faltan datos del pedido" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const total = productos.reduce(
      (acc, p) => acc + (Number(p.price) || 0) * (Number(p.quantity) || 1),
      0
    );

    // === Correo a la tienda ===
    await transporter.sendMail({
      from: `"Pedidos Granja Xuyá" <${process.env.EMAIL_USER}>`,
      to: process.env.STORE_EMAIL,
      subject: `🧺 Nuevo pedido de ${identificacion.nombres} ${identificacion.apellidos}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 25px;">
            <h2 style="color: #4A7C2B; text-align: center;">🐔 Nuevo pedido recibido</h2>
            <hr style="border: none; border-top: 2px solid #4A7C2B; width: 60px; margin: 15px auto;">

            <h3 style="color: #333;">📋 Datos del cliente</h3>
            <p><b>Nombre:</b> ${identificacion.nombres} ${identificacion.apellidos}</p>
            <p><b>Teléfono:</b> ${identificacion.telefono}</p>
            <p><b>Email:</b> <a href="mailto:${identificacion.email}" style="color:#4A7C2B;">${identificacion.email}</a></p>

            <h3 style="color: #333;">🚚 Datos de envío</h3>
            <p><b>Departamento:</b> ${envio.departamento}</p>
            <p><b>Municipio:</b> ${envio.municipio}</p>
            <p><b>Dirección:</b> ${envio.direccion}</p>
            <p><b>Información adicional:</b> ${envio.infoExtra || 'N/A'}</p>

            <h3 style="color: #333;">🧾 Productos</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #f1f5f3;">
                  <th align="left" style="padding: 8px;">Producto</th>
                  <th align="center" style="padding: 8px;">Cantidad</th>
                  <th align="right" style="padding: 8px;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${productos.map(p => `
                  <tr>
                    <td style="padding: 6px;">${p.title || p.name}</td>
                    <td align="center" style="padding: 6px;">${p.quantity || 1}</td>
                    <td align="right" style="padding: 6px;">Q${Number(p.price).toFixed(2)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
            <h3 style="text-align:right; color:#4A7C2B;">Total: Q${total.toFixed(2)}</h3>
          </div>
          <p style="text-align:center; color:#777; font-size:12px; margin-top:10px;">© ${new Date().getFullYear()} Granja Xuyá</p>
        </div>`
    });

    // === Correo al usuario ===
    await transporter.sendMail({
      from: `"Granja Xuyá" <${process.env.EMAIL_USER}>`,
      to: identificacion.email,
      subject: `✅ Pedido recibido - Granja Xuyá`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background-color:#f9fafb;padding:30px;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);padding:25px;">
            <h2 style="text-align:center;color:#4A7C2B;">¡Gracias por tu pedido, ${identificacion.nombres.split(' ')[0]}! 🐔</h2>
            <p style="font-size:16px;color:#333;text-align:center;">Hemos recibido tu pedido correctamente y lo procesaremos en las próximas horas.</p>

            <hr style="border:none;border-top:2px solid #4A7C2B;width:60px;margin:20px auto;">

            <h3 style="color:#333;">🧾 Resumen del pedido</h3>
            <table style="width:100%;border-collapse:collapse;margin-top:10px;">
              <thead>
                <tr style="background-color:#f1f5f3;">
                  <th align="left" style="padding:8px;">Producto</th>
                  <th align="center" style="padding:8px;">Cantidad</th>
                  <th align="right" style="padding:8px;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${productos.map(p => `
                  <tr>
                    <td style="padding:6px;">${p.title || p.name}</td>
                    <td align="center" style="padding:6px;">${p.quantity || 1}</td>
                    <td align="right" style="padding:6px;">Q${Number(p.price).toFixed(2)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
            <h3 style="text-align:right;color:#4A7C2B;">Total: Q${total.toFixed(2)}</h3>

            <p style="margin-top:25px;text-align:center;color:#333;">
              Nos comunicaremos contigo pronto.<br>
              <b>¡Gracias por confiar en Granja Xuyá! 🐔</b>
            </p>
          </div>
          <p style="text-align:center;color:#777;font-size:12px;margin-top:10px;">© ${new Date().getFullYear()} Granja Xuyá</p>
        </div>`
    });

    return res.status(200).json({ message: "Correos enviados correctamente" });
  } catch (err) {
    console.error("Error enviando correos:", err);
    return res.status(500).json({ message: "Error al enviar correos" });
  }
};

