import { useLayoutEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import projects from "../data/projects";
import CategoryCarousel from "../components/gallery/CategoryCarousel";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

const categoryDescriptions = {
  "Architectural Lighting": "Experience our premium architectural lighting installations, which feature advanced illumination design and ambient atmosphere creation for large-scale commercial and residential environments. Our expert team seamlessly integrates cutting-edge lighting technology with structural aesthetics to highlight the true character of every building.",
  "Entertainment Lighting": "Discover our premium entertainment and immersive lighting projects focused on dynamic fixtures, high-impact visuals, and seamless video integration. Designed for maximum impact, these installations transform clubs, arenas, and stages into spectacular visual experiences that captivate and thrill audiences.",
  "Interactive Lighting": "Explore our interactive lighting solutions equipped with responsive control systems and feature installations designed to engage and amaze. By merging art with advanced sensor technology, we create dynamic, playful environments that react to human presence and elevate user engagement.",
  "Linear Lighting": "Browse our large-format linear installations and architectural lighting designs used for crafting sleek, modern entertainment and retail spaces. These minimalist yet powerful fixtures provide unbroken lines of continuous illumination, adding depth, direction, and a futuristic aesthetic to any interior.",
  "Retail Lighting": "View our dynamic retail lighting solutions specifically designed to enhance product visibility, guide customer flow, and create a highly engaging shopping environment. By carefully balancing color rendering and accent illumination, we help brands create unforgettable in-store experiences that showcase premium merchandise."
};

import PageTransition from "../components/ui/motion/PageTransition";

export default function Projects() {
  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (projectId) => {
    setExpandedCategories(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <PageTransition>
      <SEO title="Projects | Credence Lighting" description="View our portfolio of successful architectural lighting projects." />
      <Navbar />
      
      <div className="relative min-h-screen bg-black overflow-hidden pt-32 pb-10">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#c8a96b]/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12 mb-10">
          <div className="text-center max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
              Our Portfolio
            </p>
            <h1 className="text-fluid-h1 font-serif text-white">
              Featured
              <span className="italic text-[#c8a96b]"> Projects</span>
            </h1>
            <p className="mt-10 text-white/50 text-lg leading-[1.8]">
              Explore our diverse portfolio of premium lighting projects across commercial, hospitality, residential, and retail sectors. From the initial concept design to final commissioning, our team meticulously crafts immersive environments. Browse through our selected works below to see how we bring spaces to life with precision, innovative technology, and creative vision.
            </p>
          </div>
        </div>

        <div className="max-w-[1700px] mx-auto px-6 md:px-12 mt-10 relative z-10">
          {projects.map((project) => (
            <div key={project.id} className="mb-32 last:mb-10">
              <div className="mb-8 md:mb-12">
                <div className="border-b border-white/10 pb-4 md:pb-6 mb-4 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-8 md:w-12 h-[1px] bg-[#c8a96b]" />
                    <h2 className="text-fluid-h2 font-serif text-white">{project.name}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link 
                      to={`/project/${project.slug}`}
                      onClick={() => scrollToTop()}
                      className="shrink-0 hidden md:inline-flex border border-white/20 backdrop-blur-sm text-white px-8 py-3 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full items-center justify-center hover:bg-white hover:text-black"
                    >
                      View Project
                    </Link>
                    <Link 
                      to="/contact"
                      onClick={() => scrollToTop()}
                      className="shrink-0 hidden md:inline-flex border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-8 py-3 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full items-center justify-center gap-3 group hover:bg-[#c8a96b] hover:text-black"
                    >
                      Enquire Now
                      <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
                
                <div className="w-full pr-0 md:pr-8 pl-0 md:pl-[72px] mt-4 md:mt-0 flex flex-col gap-2 mb-8">
                  <p className="text-[#c8a96b] text-sm uppercase tracking-widest font-medium">{project.location}</p>
                  <p className={`text-white/70 text-base md:text-lg leading-[1.8] font-light text-justify transition-all duration-300 ${!expandedCategories[project.id] ? 'line-clamp-2 md:line-clamp-none' : ''}`}>
                    {project.description}
                  </p>
                  <button 
                    onClick={() => toggleCategory(project.id)}
                    className="md:hidden mt-3 text-[#c8a96b] text-xs uppercase tracking-wider font-semibold self-start"
                  >
                    {expandedCategories[project.id] ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
              </div>
              
              <CategoryCarousel 
                items={project.gallery.map((img, idx) => ({ id: idx, hero: img }))} 
                isProduct={false} 
                hideLinkOverlay={true} 
              />
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:hidden w-full gap-4">
                <Link 
                  to={`/project/${project.slug}`}
                  onClick={() => scrollToTop()}
                  className="w-full inline-flex border border-white/20 backdrop-blur-sm text-white px-6 py-3 tracking-[0.2em] uppercase text-xs sm:text-sm transition-all duration-500 rounded-full items-center justify-center hover:bg-white hover:text-black"
                >
                  View Project
                </Link>
                <Link 
                  to="/contact"
                  onClick={() => scrollToTop()}
                  className="w-full inline-flex border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-6 py-3 tracking-[0.2em] uppercase text-xs sm:text-sm transition-all duration-500 rounded-full items-center justify-center gap-3 group hover:bg-[#c8a96b] hover:text-black"
                >
                  Enquire Now
                  <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </PageTransition>
  );
}
