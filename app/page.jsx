import StickyBars from "@/components/StickyBars";
import Hero from "@/components/Hero";
import Schedule from "@/components/sections/Schedule";
import Gallery from "@/components/sections/Gallery";
import Speaker from "@/components/sections/Speaker";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <StickyBars />
      <main>
        <Hero />
        <Schedule />
        <Gallery />
        <Speaker />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
