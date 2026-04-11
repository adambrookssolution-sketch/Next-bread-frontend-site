"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    celular: formData.get("celular") as string,
    productosInteres: formData.getAll("productosInteres") as string[],
    consentimientoWhatsapp: formData.get("consentimientoWhatsapp") === "on",
    mensaje: formData.get("mensaje") as string,
  };

  // Validation
  if (!data.nombre || !data.email || !data.celular) {
    return {
      success: false,
      message: "Por favor, completa los campos obligatorios.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: "Por favor, ingresa un email válido.",
    };
  }

  try {
    const productosText =
      data.productosInteres.length > 0
        ? data.productosInteres.join(", ")
        : "No especificado";

    await resend.emails.send({
      from: "Nestarez Web <web@panaderianestarez.com>",
      to: ["admin@panaderianestarez.com"],
      replyTo: data.email,
      subject: `Nuevo contacto: ${data.nombre}`,
      html: `
        <h2>Nuevo mensaje del formulario de contacto</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Nombre</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Email</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Celular</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;"><a href="tel:+51${data.celular}">${data.celular}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Productos de interés</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${productosText}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Mensaje</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.mensaje || "Sin mensaje"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">WhatsApp</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.consentimientoWhatsapp ? "Sí, acepta recibir ofertas" : "No"}</td>
          </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 16px;">Enviado desde panaderianestarez.com</p>
      `,
    });

    return {
      success: true,
      message: "¡Gracias por contactarnos! Nos comunicaremos contigo pronto.",
    };
  } catch {
    return {
      success: false,
      message: "Hubo un error al enviar el formulario. Intenta nuevamente.",
    };
  }
}
