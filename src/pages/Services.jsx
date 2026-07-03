import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ServicesSection from "../components/home/ServicesSection";
import { scrollToTop } from "../utils/scrollUtils";

export default function Services() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black pt-10">
        <ServicesSection />
      </div>
      <Footer />
    </>
  );
}
