import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectsSection from "../components/home/ProjectsSection";
import { scrollToTop } from "../utils/scrollUtils";

export default function Projects() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black pt-10">
        <ProjectsSection />
      </div>
      <Footer />
    </>
  );
}
