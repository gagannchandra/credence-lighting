import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ContactSection from "../components/home/ContactSection";
import { scrollToTop } from "../utils/scrollUtils";

export default function Contact() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black pt-10">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
