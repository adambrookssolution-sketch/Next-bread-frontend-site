"use client";

import Image from "next/image";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { CLIENTS } from "@/app/lib/constants";

export default function Clients() {
  // Duplicate the list to create seamless infinite scroll
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 lg:py-28 bg-dark">
      <Container>
        <SectionHeading
          title="Confían en Nosotros"
          subtitle="Empresas e instituciones que eligen nuestros productos día a día."
          light
        />
      </Container>

      {/* Carousel wrapper — full width, overflow hidden */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-dark to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex items-center gap-12 sm:gap-16 animate-scroll hover:[animation-play-state:paused]">
          {items.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 flex items-center justify-center w-36 h-24 sm:w-44 sm:h-28 rounded-lg bg-white/10 p-4 sm:p-5 transition-all duration-300 hover:bg-white/20"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={80}
                className="max-h-full w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
