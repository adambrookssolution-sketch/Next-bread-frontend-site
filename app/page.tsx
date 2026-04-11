import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import Products from "@/app/components/sections/Products";
import About from "@/app/components/sections/About";
import Locations from "@/app/components/sections/Locations";
import Clients from "@/app/components/sections/Clients";
import Contact from "@/app/components/sections/Contact";
import { getProducts, getLocations, getClients, getAbout, getHero } from "@/app/lib/contentful";

export const revalidate = 60;

export default async function Home() {
  const [products, locations, clients, about, hero] = await Promise.all([
    getProducts(),
    getLocations(),
    getClients(),
    getAbout(),
    getHero(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero hero={hero} />
        <Products products={products} />
        <About about={about} />
        <Locations locations={locations} />
        <Clients clients={clients} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
