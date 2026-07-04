import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import PageLink from "../components/ui/PageLink";
import CategoryCarousel from "../components/gallery/CategoryCarousel";
import projects from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((item) => item.id === Number(id));
  const project = projects[currentIndex];

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // Reset text expansion when changing project
  useEffect(() => {
    setIsTextExpanded(false);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white text-3xl font-serif">
        <BackButton />
        Project Not Found
      </div>
    );
  }

  // Create items array for CategoryCarousel
  const galleryItems = project.gallery.map((img, idx) => ({ id: idx, hero: img }));

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden text-white">
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#b89b5e] rounded-full blur-[160px] opacity-[0.07]" />
        <div className="absolute top-[70%] right-[5%] w-[40%] h-[40%] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.07]" />
      </div>
      
      <BackButton />

      <section className="relative pt-24 md:pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* LEFT: CategoryCarousel Slider */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <CategoryCarousel 
            items={galleryItems} 
            isProduct={false} 
            isSplitLayout={true} 
            hideLinkOverlay={true}
          />
          {/* Accent element behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[38rem] h-[53vh] sm:h-[63vh] md:h-[83vh] border border-[#c8a96b]/20 rounded-xl z-0 pointer-events-none hidden md:block" />
        </div>

        {/* RIGHT: Sticky Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="uppercase tracking-[0.4em] text-xs font-semibold text-[#b89b5e] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#b89b5e]"></span>
            {project.category}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif leading-[1.1] mb-6 tracking-tight"
          >
            {project.name}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center text-white/50 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-10 font-medium"
          >
            <span>{project.location}</span>
            <span className="w-1 h-1 rounded-full bg-[#c8a96b]" />
            <span>{project.year}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="mb-8 max-w-[600px]"
          >
            <div className={`space-y-6 text-white/70 text-sm sm:text-base leading-[1.8] font-light transition-all duration-300 ${!isTextExpanded ? 'line-clamp-4 md:line-clamp-none' : ''}`}>
              <p>{project.description}</p>
              
              <div className="hidden md:block space-y-6 pt-4">
                <div>
                  <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">The Challenge</h3>
                  <p>Integrating complex lighting systems into an existing architectural framework required meticulous planning. The environment demanded a delicate balance between dramatic visual impact and everyday functional illumination, all while adhering to strict energy efficiency guidelines.</p>
                </div>
                <div>
                  <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">Our Approach</h3>
                  <p>Our team deployed a tailored suite of advanced fixtures. By utilizing precision-engineered optics and intelligent control systems, we were able to sculpt the space with light, highlighting key structural elements without causing glare or light spillage.</p>
                </div>
                <div>
                  <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">The Result</h3>
                  <p>A breathtaking, immersive environment that seamlessly adapts to different times of day and usage scenarios. The installation not only elevated the aesthetic appeal of the space but also established a new benchmark for sustainable, luxury lighting design.</p>
                </div>
              </div>

              {/* Mobile expanded view of the extra text */}
              {isTextExpanded && (
                <div className="md:hidden space-y-6 pt-4">
                  <div>
                    <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">The Challenge</h3>
                    <p>Integrating complex lighting systems into an existing architectural framework required meticulous planning. The environment demanded a delicate balance between dramatic visual impact and everyday functional illumination.</p>
                  </div>
                  <div>
                    <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">Our Approach</h3>
                    <p>Our team deployed a tailored suite of advanced fixtures utilizing precision-engineered optics and intelligent control systems to sculpt the space with light.</p>
                  </div>
                  <div>
                    <h3 className="text-[#c8a96b] text-xs uppercase tracking-widest font-semibold mb-2">The Result</h3>
                    <p>A breathtaking, immersive environment that seamlessly adapts to different times of day, elevating the aesthetic appeal of the space.</p>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsTextExpanded(!isTextExpanded)}
              className="md:hidden mt-4 text-[#c8a96b] text-xs uppercase tracking-wider font-semibold"
            >
              {isTextExpanded ? 'Show Less' : 'Learn More'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <PageLink
              to="/contact"
              className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-12 py-4 tracking-[0.2em] uppercase text-xs font-medium hover:bg-[#c8a96b] hover:border-[#c8a96b] hover:text-black transition-all duration-500 shadow-xl rounded-sm group"
            >
              Enquire Now
              <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </PageLink>
          </motion.div>
        </div>
      </section>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 flex gap-3 md:gap-4 z-40 mix-blend-difference">
        {previousProject && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate(`/project/${previousProject.id}`);
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
            aria-label="Previous project"
          >
            <span className="text-xl leading-none -translate-y-[1px]">←</span>
          </button>
        )}
        {nextProject && (
          <button
             onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate(`/project/${nextProject.id}`);
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
            aria-label="Next project"
          >
            <span className="text-xl leading-none -translate-y-[1px]">→</span>
          </button>
        )}
      </div>
    </main>
  );
}
