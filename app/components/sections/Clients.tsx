"use client";

import Image from "next/image";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import type { CmsClient } from "@/app/lib/contentful";

interface ClientsProps {
  clients: CmsClient[];
}

export default function Clients({ clients }: ClientsProps) {
  if (clients.length === 0) return null;

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
      <div className="relative overflow-hidden group">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-dark to-transparent z-10" />

        {/* Scrolling track - duplicated twice for seamless loop */}
        <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused] will-change-transform">
          {/* Original list */}
          <ul className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0">
            {clients.map((client) => (
              <ClientLogo key={client.id} client={client} />
            ))}
          </ul>
          {/* Duplicate list (aria-hidden for accessibility) */}
          <ul
            className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0"
            aria-hidden="true"
          >
            {clients.map((client) => (
              <ClientLogo key={`dup-${client.id}`} client={client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ClientLogo({ client }: { client: CmsClient }) {
  return (
    <li className="flex-shrink-0 flex items-center justify-center w-40 h-28 sm:w-48 sm:h-32 rounded-xl bg-white p-5 sm:p-6 shadow-lg transition-all duration-300 hover:scale-105">
      <Image
        src={client.logo}
        alt={client.name}
        width={180}
        height={100}
        className="max-h-full max-w-full w-auto h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    </li>
  );
}
