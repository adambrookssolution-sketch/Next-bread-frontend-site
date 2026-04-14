import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import Products from "@/app/components/sections/Products";
import About from "@/app/components/sections/About";
import Locations from "@/app/components/sections/Locations";
import Clients from "@/app/components/sections/Clients";
import Contact from "@/app/components/sections/Contact";
import {
  getProducts,
  getLocations,
  getClients,
  getAbout,
  getHero,
  getBrand,
  getCategories,
} from "@/app/lib/contentful";

export const revalidate = 60;

export default async function Home() {
  const [products, locations, clients, about, hero, brand, categories] = await Promise.all([
    getProducts(),
    getLocations(),
    getClients(),
    getAbout(),
    getHero(),
    getBrand(),
    getCategories(),
  ]);

  return (
    <>
      <Header brand={brand} />
      <main>
        <Hero hero={hero} brand={brand} />
        <Products products={products} />
        <About about={about} />
        <Locations locations={locations} />
        <Clients clients={clients} />
        <Contact brand={brand} categories={categories} />
      </main>
      <Footer brand={brand} locations={locations} />
    </>
  );
}
