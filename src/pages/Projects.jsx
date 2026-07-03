import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectsSection from "../components/home/ProjectsSection";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

export default function Projects() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <SEO title="Projects | Credence Lighting" description="View our portfolio of successful architectural lighting projects." />
      <Navbar />
      <div className="bg-black pt-10">
        <ProjectsSection />
      </div>
      <Footer />
    </>
  );
}
