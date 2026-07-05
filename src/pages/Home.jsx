import { useEffect, Suspense, lazy } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReturnScrollHandler from "../components/ReturnScrollHandler";
import { scrollToSection } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ProductsSection from "../components/home/ProductsSection";
import BrandsSection from "../components/home/BrandsSection";
const GlobalPresence = lazy(() => import("../components/home/GlobalPresence"));
import ProjectsSection from "../components/home/ProjectsSection";
import ContactSection from "../components/home/ContactSection";
import PageTransition from "../components/ui/motion/PageTransition";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.replace("#", "");
    const timer = setTimeout(() => scrollToSection(sectionId), 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <SEO 
        title="Credence Lighting | Premium Architectural & Commercial Lighting"
        description="Credence Lighting provides bespoke architectural, commercial, and residential luxury lighting solutions. Elevate your spaces with premium craftsmanship."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Credence Lighting",
            "url": "https://credencelighting.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://credencelighting.com/products?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Credence Lighting",
            "url": "https://credencelighting.com",
            "logo": "https://credencelighting.com/logo2.webp",
            "sameAs": [
              "https://www.facebook.com/credencelighting",
              "https://www.instagram.com/credencelighting",
              "https://www.linkedin.com/company/credencelighting"
            ]
          }
        ]}
      />
      <ReturnScrollHandler />
      <Navbar />

      <main className="bg-[#050505] min-h-screen relative overflow-hidden">
        {/* Global Continuous Background Lighting */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.08] will-change-transform transform-gpu" 
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.08] will-change-transform transform-gpu" 
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <AboutSection preview={true} />
          
          <ProjectsSection preview={true} />
          <ProductsSection preview={true} />
          <BrandsSection preview={true} />
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center bg-black"><p className="text-[#c8a96b] uppercase tracking-widest text-xs">Loading Interactive Map...</p></div>}>
            <GlobalPresence />
          </Suspense>
          <ContactSection preview={true} />
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}