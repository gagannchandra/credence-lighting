import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ContactSection from "../components/home/ContactSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

export default function Contact() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <SEO title="Contact Us | Credence Lighting" description="Get in touch with our team for your next commercial lighting project." />
      <Navbar />
      <div className="bg-black pt-10">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
