import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AboutSection from "../components/home/AboutSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

import PageTransition from "../components/ui/motion/PageTransition";

export default function About() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <PageTransition>
      <SEO 
        title="About Credence Lighting | Premium Lighting Manufacturers & Designers" 
        description="Discover the legacy of Credence Lighting. We are pioneers in bespoke architectural, commercial, and residential luxury lighting, merging innovation with timeless craftsmanship." 
      />
      <Navbar />
      <div className="relative bg-black pt-10 pb-20 overflow-hidden">
        {/* SHARED BACKGROUND GLOW */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#c8a96b]/10 blur-[200px] pointer-events-none" />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#c8a96b]/10 blur-[180px] pointer-events-none" />
        
        {/* SHARED GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10">
          <AboutSection />
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
