import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AboutSection from "../components/home/AboutSection";
import { scrollToTop } from "../utils/scrollUtils";

export default function About() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black pt-10">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}
