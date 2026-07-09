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
        title="Credence Lighting · Premium Lighting Dubai"
        description="Credence Lighting provides premium architectural, commercial, and hospitality lighting solutions across Dubai and the UAE. 10+ years, 1000+ projects delivered."
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
            "name": "Credence Lighting LLC",
            "url": "https://credencelighting.com",
            "logo": "https://credencelighting.com/logo2.webp",
            "description": "Premium architectural, commercial, and hospitality lighting design, supply, and installation across Dubai, UAE, and the GCC region.",
            "telephone": "+971564965660",
            "email": "info@credencelighting.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit E77, Arabtec Eastern Model, Dubai Investment Park 1",
              "addressLocality": "Dubai",
              "addressRegion": "Dubai",
              "addressCountry": "AE"
            },
            "sameAs": [
              "https://www.instagram.com/credencelighting/",
              "https://www.linkedin.com/company/credence-lighting-llc/"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Credence Lighting LLC",
            "image": "https://credencelighting.com/logo2.webp",
            "url": "https://credencelighting.com",
            "telephone": "+971564965660",
            "email": "info@credencelighting.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit E77, Arabtec Eastern Model, Dubai Investment Park 1",
              "addressLocality": "Dubai",
              "addressRegion": "Dubai",
              "addressCountry": "AE"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "priceRange": "$$$$",
            "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "Saudi Arabia", "Bahrain"]
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Site Navigation",
            "itemListElement": [
              {
                "@type": "SiteNavigationElement",
                "position": 1,
                "name": "Products",
                "url": "https://credencelighting.com/products",
                "description": "Explore our premium collection of indoor, outdoor, hospitality, and facade lighting."
              },
              {
                "@type": "SiteNavigationElement",
                "position": 2,
                "name": "Projects",
                "url": "https://credencelighting.com/projects",
                "description": "View our featured installations across architectural, entertainment, and retail sectors."
              },
              {
                "@type": "SiteNavigationElement",
                "position": 3,
                "name": "About Us",
                "url": "https://credencelighting.com/about",
                "description": "10+ years of experience delivering premium lighting solutions in the UAE."
              },
              {
                "@type": "SiteNavigationElement",
                "position": 4,
                "name": "Contact",
                "url": "https://credencelighting.com/contact",
                "description": "Get in touch with our lighting experts in Dubai Investment Park."
              }
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