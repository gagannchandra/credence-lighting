import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AboutSection from "../components/home/AboutSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

export default function About() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <SEO title="About Us | Credence Lighting" description="Learn more about Credence Lighting and our premium architectural lighting solutions." />
      <Navbar />
      <div className="bg-black pt-10">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}
