import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ContactSection from "../components/home/ContactSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

import PageTransition from "../components/ui/motion/PageTransition";

export default function Contact() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <PageTransition>
      <SEO 
        title="Contact Credence Lighting | Luxury Lighting Consultants" 
        description="Get in touch with Credence Lighting for bespoke architectural and commercial lighting solutions. Book a consultation with our expert lighting designers." 
        schema={[{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Credence Lighting",
          "image": "https://credencelighting.com/logo.png",
          "url": "https://credencelighting.com/contact",
          "telephone": "+971-123456789",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Design District",
            "addressLocality": "Dubai",
            "addressCountry": "AE"
          }
        }]}
      />
      <Navbar />
      <div className="bg-black pt-10">
        <ContactSection />
      </div>
      <Footer />
    </PageTransition>
  );
}
