import CTA from "@/components/sections/CTA";
import Faq02 from "@/components/sections/FAQs";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import NavBar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Problems from "@/components/sections/Problems";

export default function Home() {
  return (
    <section className="relative h-screen">
      <div className="absolute -top-[10rem] left-[50%] size-[12rem] translate-x-[-50%] rounded-full bg-gradient-to-t from-green-500 to-green-700 blur-[8em] md:-top-[35rem] md:size-[40rem] md:opacity-55"></div>
      <NavBar />
      <Hero />
      <Problems />
      <Features />
      <Pricing /> 
      <Faq02 />
      <CTA />
      <Footer />
    </section>
  );
}
