import StickyBars from "@/components/StickyBars";
import Hero from "@/components/Hero";
import Pain from "@/components/sections/Pain";
import Shift from "@/components/sections/Shift";
import Program from "@/components/sections/Program";
import Takeaways from "@/components/sections/Takeaways";
import Speaker from "@/components/sections/Speaker";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
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
        <Takeaways />
        <Speaker />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
