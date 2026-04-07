"use server";

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
    direccion: formData.get("direccion") as string,
    fechaNacimiento: formData.get("fechaNacimiento") as string,
    localPreferencia: formData.get("localPreferencia") as string,
    comoNosConociste: formData.get("comoNosConociste") as string,
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
    // TODO: Integrate with email service (Resend, Nodemailer, etc.)
    // For now, log the data. In production, this would send an email
    // to admin@panaderianestarez.com
    console.log("Contact form submission:", data);

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
