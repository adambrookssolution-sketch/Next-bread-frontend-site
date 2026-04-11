"use client";

import { useState } from "react";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import type { CmsLocation } from "@/app/lib/contentful";

interface LocationsProps {
  locations: CmsLocation[];
}

export default function Locations({ locations }: LocationsProps) {
  const [activeLocation, setActiveLocation] = useState(0);

  const getEmbedUrl = (loc: CmsLocation) => {
    if (loc.coords) {
      const { lat, lng } = loc.coords;
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(loc.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <section id="locales" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          title="Nuestros Locales"
          subtitle="Visítanos en cualquiera de nuestras 4 sucursales en Chincha Alta."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map — switches based on selected location */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-lg overflow-hidden border border-neutral/20">
            <iframe
              key={activeLocation}
              src={getEmbedUrl(locations[activeLocation])}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación de ${locations[activeLocation].name} — ${locations[activeLocation].address}`}
            />
          </div>

          {/* Location cards */}
          <div className="space-y-4">
            {locations.map((location, index) => (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveLocation(index)}
                className={`w-full text-left p-5 rounded-lg border transition-all ${
                  activeLocation === index
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-neutral/20 hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg text-dark tracking-wide mb-3">
                  {location.name}
                </h3>

                <div className="space-y-2 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3 text-neutral">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{location.address}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-neutral">
                    <svg className="w-4 h-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a
                      href={`tel:+51${location.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-primary transition-colors"
                    >
                      +51 {location.phone}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 text-neutral">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      {location.hours.map((hour) => (
                        <p key={hour}>{hour}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    Cómo llegar
                  </a>
                  <a
                    href={`tel:+51${location.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Llamar
                  </a>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
