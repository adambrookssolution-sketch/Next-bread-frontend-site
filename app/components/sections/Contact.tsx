"use client";

import { useActionState } from "react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Button from "@/app/components/ui/Button";
import { BRAND, LOCATIONS } from "@/app/lib/constants";
import { submitContactForm, type ContactFormState } from "@/app/lib/actions";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-primary-light/30">
      <Container>
        <SectionHeading
          title="Contáctanos"
          subtitle="¿Tienes alguna consulta o pedido especial? Escríbenos y te responderemos a la brevedad."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <form action={formAction} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-dark mb-1.5">
                    Nombre <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="celular" className="block text-sm font-medium text-dark mb-1.5">
                    Celular <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="956 660 316"
                  />
                </div>
                <div>
                  <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-dark mb-1.5">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-dark mb-1.5">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="Tu dirección"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Local de preferencia */}
                <div>
                  <label htmlFor="localPreferencia" className="block text-sm font-medium text-dark mb-1.5">
                    Local de preferencia
                  </label>
                  <select
                    id="localPreferencia"
                    name="localPreferencia"
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    <option value="">Selecciona un local</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.address.split(",")[0]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ¿Cómo nos conociste? */}
                <div>
                  <label htmlFor="comoNosConociste" className="block text-sm font-medium text-dark mb-1.5">
                    ¿Cómo nos conociste?
                  </label>
                  <select
                    id="comoNosConociste"
                    name="comoNosConociste"
                    className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="redes-sociales">Redes sociales</option>
                    <option value="recomendacion">Recomendación</option>
                    <option value="google">Google</option>
                    <option value="pasando-por-la-calle">Pasando por la calle</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              {/* Productos de interés */}
              <div>
                <p className="block text-sm font-medium text-dark mb-2">
                  Productos de interés
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Galletas de Agua", "Panes de Molde", "Panes Artesanales", "Bollería", "Pastelería", "Tortas para Eventos"].map((producto) => (
                    <label key={producto} className="flex items-center gap-2 text-sm text-dark cursor-pointer">
                      <input
                        type="checkbox"
                        name="productosInteres"
                        value={producto}
                        className="w-4 h-4 rounded border-neutral/30 text-primary focus:ring-primary/30"
                      />
                      {producto}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-dark mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-neutral/30 bg-white text-dark placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              {/* Consentimiento WhatsApp */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consentimientoWhatsapp"
                  className="w-4 h-4 mt-0.5 rounded border-neutral/30 text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-neutral">
                  Acepto recibir ofertas y promociones por WhatsApp
                </span>
              </label>

              {state.message && (
                <div
                  className={`p-4 rounded-lg text-sm ${
                    state.success
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {state.message}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                {isPending ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-[family-name:var(--font-display)] text-lg text-dark tracking-wide mb-4">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-neutral hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-sm">{BRAND.email}</span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:+51${BRAND.whatsapp}`}
                  className="flex items-center gap-3 text-neutral hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-sm">+51 {BRAND.whatsapp}</span>
                </a>

                {/* Facebook */}
                {BRAND.facebook && (
                  <a
                    href={BRAND.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <span className="text-sm">PanaderiaNestarez</span>
                  </a>
                )}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 p-6 rounded-lg border border-[#25D366]/20">
              <h4 className="font-semibold text-dark mb-2">¿Prefieres WhatsApp?</h4>
              <p className="text-sm text-neutral mb-4">
                Escríbenos directamente y te atenderemos al instante.
              </p>
              <Button href={BRAND.whatsappLink} variant="whatsapp" size="md" external className="w-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Abrir WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
