import Image from "next/image";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { ABOUT } from "@/app/lib/constants";
import type { CmsAbout } from "@/app/lib/contentful";

const valueIcons = [
  // Pasión Artesanal
  <svg key="passion" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
  // Tradición
  <svg key="tradition" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>,
  // Calidad
  <svg key="quality" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
  // Compromiso
  <svg key="commitment" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
  </svg>,
];

interface AboutProps {
  about: CmsAbout;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-primary-light/30">
      <Container>
        <SectionHeading
          title="Nuestra Historia"
          subtitle="Desde nuestros inicios, cada producto lleva la esencia de lo artesanal."
        />

        {/* Mission + Image zigzag */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/about/14.jpg"
              alt="Panadero artesanal de Nestarez"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl text-dark tracking-wide mb-4">
              Nuestra Misión
            </h3>
            <p className="text-neutral leading-relaxed text-lg">
              {about.mision}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl text-dark tracking-wide mb-4">
              Nuestra Visión
            </h3>
            <p className="text-neutral leading-relaxed text-lg">
              {about.vision}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/about/18.jpg"
              alt="Proceso artesanal de elaboración"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Process gallery */}
        <div className="mb-20">
          <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl text-dark tracking-wide text-center mb-8">
            Nuestro Proceso Artesanal
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/about/1.jpg", alt: "Panadero preparando masa artesanal" },
              { src: "/images/about/15.jpg", alt: "Preparación de panes en el taller" },
              { src: "/images/about/2.jpg", alt: "Horno artesanal de Nestarez" },
              { src: "/images/about/17.jpg", alt: "Selección de ingredientes de calidad" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ABOUT.valores.map((valor, index) => (
            <div
              key={valor.title}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                {valueIcons[index]}
              </div>
              <h4 className="font-[family-name:var(--font-display)] text-lg text-dark tracking-wide mb-2">
                {valor.title}
              </h4>
              <p className="text-sm text-neutral leading-relaxed">
                {valor.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
