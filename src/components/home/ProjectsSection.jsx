import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../../data/projects";
import { useNavigate, useLocation } from "react-router-dom";
import { saveReturnState } from "../../utils/navigationState";
import { duration, ease } from "../../utils/motion";
import TextReveal from "../ui/motion/TextReveal";
import FadeUp from "../ui/motion/FadeUp";

const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
const categories = ["All", ...uniqueCategories];

const categoryDescriptions = {
  "Architectural Lighting": "Premium architectural lighting installations featuring advanced illumination design and ambient atmosphere creation for large-scale commercial environments.",
  "Entertainment Lighting": "Premium entertainment and immersive lighting projects focused on dynamic fixtures, high-impact visuals, and seamless video integration.",
  "Interactive Lighting": "Interactive lighting with responsive control systems and feature installations designed to engage and amaze.",
  "Linear Lighting": "Large-format linear installations and architectural lighting used for crafting immersive entertainment and retail spaces.",
  "Retail Lighting": "Dynamic retail lighting solutions designed to enhance product visibility and create an engaging shopping environment."
};

export default function ProjectsSection({ hideHeader = false, preview = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const filteredProjects = active === "All" ? projects.slice(0, 6) : projects.filter((item) => item.category === active);

  // Representative project for each category (used in All view)
  const representativeProjects = projects; // We just show all 6 projects in the All view

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  const handleViewAllClick = () => {
    navigate("/gallery");
  };

  // Auto-slide for category view
  useEffect(() => {
    if (active !== "All" && filteredProjects.length > 1) {
      const interval = setInterval(() => {
        setActiveProjectIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
      }, 5000); // 5 seconds auto-slide
      return () => clearInterval(interval);
    }
  }, [active, filteredProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (active === "All") return;
      if (e.key === "ArrowLeft") {
        setActiveProjectIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveProjectIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, filteredProjects.length]);

  // Bento Box Layout configurations for 'All' view
  const getBentoClasses = (index) => {
    const patterns = [
      "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2", // Item 0
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 1
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 2
      "md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2", // Item 3
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 4
      "md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1", // Item 5
      "md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 6
      "md:col-span-2 md:row-span-1 lg:col-span-4 lg:row-span-1", // Item 7
    ];
    return patterns[index % 8];
  };

  return (
    <section id="projects" className="text-white px-4 md:px-12 py-24 md:py-32 relative overflow-hidden bg-transparent z-10">

      <div className="max-w-[1500px] mx-auto relative z-10">
        {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <div>
            <FadeUp delay={0}>
              <p className="uppercase tracking-[0.4em] text-[11px] text-[#b89b5e] mb-6 font-semibold">
                Portfolio
              </p>
            </FadeUp>
            <h2 className="text-fluid-h2 font-serif text-white flex flex-wrap gap-2">
              <TextReveal text="Featured" /> <TextReveal text="Projects" delay={2} className="italic gold-gradient-text font-light" />
            </h2>
          </div>

          <FadeUp delay={4}>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#c8a96b", color: "#000", transition: { duration: 0.4, ease: ease.standard } }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllClick} 
              className="w-full md:w-auto border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-8 py-4 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full flex items-center justify-center gap-3 group"
            >
              View Gallery
              <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
            </motion.button>
          </FadeUp>
        </div>
        )}

        {/* Category Filters with Sliding Indicator */}
        <div className="flex flex-wrap gap-2 mb-20 relative z-20">
          {categories.map((item) => {
            const isActive = active === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setActiveProjectIndex(0);
                }}
                className={`relative px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors duration-300 rounded-full overflow-hidden ${
                  isActive ? "text-black font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectCategoryIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#d4b16a] to-[#b89b5e] shadow-[0_0_20px_rgba(200,169,107,0.4)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>

        {/* Display Mode: All vs Category */}
        <div className="min-h-[600px]">
          {active === "All" ? (
            // Bento Grid View for All Categories
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] grid-flow-dense"
            >
              <AnimatePresence mode="wait">
                {representativeProjects.slice(0, 8).map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: duration.standard, delay: index * 0.05, ease: ease.standard }}
                    className={`group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 bg-[#111] ${getBentoClasses(index)}`}
                    onClick={() => {
                      setActive(item.category);
                      setActiveProjectIndex(filteredProjects.findIndex(p => p.id === item.id) !== -1 ? filteredProjects.findIndex(p => p.id === item.id) : 0);
                    }}
                  >
                    <img
                      src={item.hero}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.08] opacity-80 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="uppercase tracking-[0.3em] text-[10px] text-[#c8a96b] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.category}
                      </p>
                      <h3 className="text-white text-2xl md:text-3xl font-serif leading-tight">{item.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Featured View for Specific Category - Continuous Coverflow Carousel
            <div className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center group select-none overflow-hidden rounded-[2.5rem]">
              {filteredProjects.map((item, index) => {
                const total = filteredProjects.length;
                let diff = index - activeProjectIndex;
                
                // Normalize diff to be between -total/2 and total/2 for infinite wrapping
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const isCenter = Math.abs(diff) < 0.5; // diff === 0
                const isLeft = diff >= -1.5 && diff <= -0.5; // diff === -1
                const isRight = diff >= 0.5 && diff <= 1.5; // diff === 1
                
                const isVisible = isCenter || (total > 1 && (isLeft || isRight));

                // Calculate X position based on relative distance
                let xPos = "0%";
                if (isLeft) xPos = "-85%";
                else if (isRight) xPos = "85%";
                else if (diff < -1) xPos = "-150%";
                else if (diff > 1) xPos = "150%";

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      x: xPos,
                      scale: isCenter ? 1 : 0.8,
                      opacity: isVisible ? (isCenter ? 1 : 0.35) : 0,
                      zIndex: isCenter ? 30 : isVisible ? 20 : 0,
                    }}
                    transition={{ duration: duration.standard, ease: ease.standard }}
                    className={`absolute w-[90%] md:w-[60%] lg:w-[50%] h-[90%] md:h-[95%] lg:h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${isCenter ? '' : 'cursor-pointer hover:opacity-60'} ${!isVisible ? 'pointer-events-none' : ''}`}
                    style={{ filter: isCenter ? "grayscale(0%)" : "grayscale(30%)" }}
                    onClick={() => {
                      if (isCenter) {
                        saveReturnState({ pathname: location.pathname, hash: location.pathname === "/" ? "#projects" : "", scrollY: window.scrollY });
                        navigate(`/project/${item.id}`);
                      }
                      if (isLeft) handlePrev();
                      if (isRight) handleNext();
                    }}
                  >
                    <img
                      src={item.hero}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    <AnimatePresence>
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 z-10"
                        >
                          {/* Gradient Overlays for Text Readability */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/10 to-black/90 pointer-events-none" />

                          {/* Snapchat-style click zones for center image */}
                          <div className="absolute inset-0 z-10 flex cursor-pointer pointer-events-none">
                            <div 
                              className="w-1/2 h-full flex items-center justify-start pointer-events-auto" 
                              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            />
                            <div 
                              className="w-1/2 h-full flex items-center justify-end pointer-events-auto" 
                              onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            />
                          </div>
                          
                          {/* Dedicated View Project button in center */}
                          <div 
                            className="absolute inset-x-1/4 inset-y-1/4 z-10 flex items-center justify-center cursor-pointer pointer-events-auto" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              saveReturnState({ pathname: location.pathname, hash: location.pathname === "/" ? "#projects" : "", scrollY: window.scrollY });
                              navigate(`/project/${item.id}`); 
                            }}
                          >
                          </div>

                          {/* Top Left Topic Overlay */}
                          <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#c8a96b]" />
                            <p className="uppercase tracking-[0.3em] text-[11px] text-[#c8a96b] font-semibold drop-shadow-md">
                              {active}
                            </p>
                          </div>

                          {/* Bottom Description Overlay */}
                          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-20 pointer-events-none max-w-2xl">
                            <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">{item.name}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-white/70 text-xs md:text-sm mb-4">
                              <span>{item.location}</span>
                              <span className="inline-block w-1 h-1 rounded-full bg-[#d4b16a]" />
                              <span>{item.year}</span>
                            </div>
                            <p className="text-white/90 text-sm md:text-base leading-[1.6] font-light shadow-black drop-shadow-lg line-clamp-2 md:line-clamp-none">
                              {categoryDescriptions[active] || item.description}
                            </p>
                            <div className="mt-6 pointer-events-auto inline-block">
                                <button onClick={() => {
                                  saveReturnState({ pathname: location.pathname, hash: location.pathname === "/" ? "#projects" : "", scrollY: window.scrollY });
                                  navigate(`/project/${item.id}`);
                                }} className="text-[#c8a96b] uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold hover:text-white transition-colors border-b border-[#c8a96b]/30 hover:border-white pb-1">
                                  View Project Details
                                </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
