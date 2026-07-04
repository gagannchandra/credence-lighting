import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReturnScrollHandler from "../components/ReturnScrollHandler";
import { scrollToSection } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ProductsSection from "../components/home/ProductsSection";
import BrandsSection from "../components/home/BrandsSection";
import GlobalPresence from "../components/home/GlobalPresence";
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
      <SEO />
      <ReturnScrollHandler />
      <Navbar />

      <main className="bg-[#050505] min-h-screen relative overflow-hidden">
        {/* Global Continuous Background Lighting */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.08]" 
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.08]" 
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <AboutSection preview={true} />
          
          <ProjectsSection preview={true} />
          <ProductsSection preview={true} />
          <BrandsSection preview={true} />
          
          <GlobalPresence />
          <ContactSection preview={true} />
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}