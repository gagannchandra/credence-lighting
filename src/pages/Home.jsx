import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReturnScrollHandler from "../components/ReturnScrollHandler";
import { scrollToSection } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import ProductsSection from "../components/home/ProductsSection";
import BrandsSection from "../components/home/BrandsSection";
import GlobalPresence from "../components/home/GlobalPresence";
import ProjectsSection from "../components/home/ProjectsSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.replace("#", "");
    const timer = setTimeout(() => scrollToSection(sectionId), 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO />
      <ReturnScrollHandler />
      <Navbar />

      <Hero />

      <AboutSection preview={true} />

      <ServicesSection preview={true} />

      <ProductsSection preview={true} />

      <GlobalPresence />
        <BrandsSection preview={true} />
      <ProjectsSection preview={true} />

      <ContactSection preview={true} />

      <Footer />
    </>
  );
}