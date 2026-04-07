"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/app/lib/constants";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const bestSeller = PRODUCTS.find((p) => p.bestSeller);
  const filtered =
    activeCategory === "Todos"
      ? PRODUCTS.filter((p) => !p.bestSeller)
      : PRODUCTS.filter(
          (p) => p.category === activeCategory && !p.bestSeller
        );

  return (
    <section id="productos" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          title="Nuestros Productos"
          subtitle="Elaborados cada día con ingredientes seleccionados y la pasión de nuestros panaderos artesanales."
        />

        {/* Best Seller — featured card */}
        {bestSeller && (
          <div className="mb-16">
            <article className="group relative grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary-light/20 rounded-xl overflow-hidden border-2 border-primary/20 hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square md:aspect-auto md:min-h-[350px] overflow-hidden">
                <Image
                  src={bestSeller.image}
                  alt={bestSeller.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Best Seller badge */}
                <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  Best Seller
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                  Nuestro Best Seller
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-dark tracking-wide mb-4">
                  {bestSeller.name}
                </h3>
                <p className="text-neutral leading-relaxed text-lg">
                  {bestSeller.description}
                </p>
              </div>
            </article>
          </div>
        )}

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-neutral/10 text-dark/70 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
              {cat !== "Todos" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({PRODUCTS.filter((p) => p.category === cat && !p.bestSeller).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden border border-neutral/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {product.category}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-dark tracking-wide">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-neutral leading-relaxed">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-neutral py-12">
            No hay productos en esta categoría.
          </p>
        )}
      </Container>
    </section>
  );
}
