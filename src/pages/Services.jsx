import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ServicesSection from "../components/home/ServicesSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

export default function Services() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <SEO title="Services | Credence Lighting" description="Discover our comprehensive lighting design, supply, and installation services." />
      <Navbar />
      <div className="bg-black pt-10">
        <ServicesSection />
      </div>
      <Footer />
    </>
  );
}
