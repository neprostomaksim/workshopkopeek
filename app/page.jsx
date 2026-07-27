import StickyBars from "@/components/StickyBars";
import Hero from "@/components/Hero";
import Pain from "@/components/sections/Pain";
import Shift from "@/components/sections/Shift";
import Program from "@/components/sections/Program";
import Format from "@/components/sections/Format";
import Speaker from "@/components/sections/Speaker";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <StickyBars />
      <main>
        <Hero />
        <Pain />
        <Shift />
        <Program />
        <Format />
        <Speaker />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
