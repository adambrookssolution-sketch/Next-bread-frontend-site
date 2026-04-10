import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import Products from "@/app/components/sections/Products";
import About from "@/app/components/sections/About";
import Locations from "@/app/components/sections/Locations";
import Clients from "@/app/components/sections/Clients";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Locations />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
