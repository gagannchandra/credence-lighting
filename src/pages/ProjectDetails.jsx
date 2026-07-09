import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import PageLink from "../components/ui/PageLink";
import projects from "../data/projects";
import SEO from "../components/seo/SEO";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Handle backward compatibility for numeric IDs
  useEffect(() => {
    if (!isNaN(slug) && !isNaN(parseFloat(slug))) {
      const oldId = Number(slug);
      const oldProject = projects.find((item) => item.id === oldId);
      if (oldProject) {
        navigate(`/projects/${oldProject.slug}`, { replace: true });
      }
    }
  }, [slug, navigate]);

  const currentIndex = projects.findIndex((item) => item.slug === slug || item.id === Number(slug));
  const project = projects[currentIndex];

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setActiveImageIndex(0);
  }

  const handlePrev = useCallback(() => {
    if (!project) return;
    setDirection(-1);
    setActiveImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  }, [project]);

  const handleNext = useCallback(() => {
    if (!project) return;
    setDirection(1);
    setActiveImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  }, [project]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0
    })
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, handlePrev, handleNext]);

  if (!project) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white text-3xl font-serif">
        <BackButton />
        Project Not Found
      </div>
    );
  }



  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden text-white">
      <SEO 
        title={`${project.name} · Luxury Lighting Project by Credence Lighting`}
        description={`Explore the architectural lighting design of ${project.name} in ${project.location} (${project.year}). Discover our bespoke ${project.category.toLowerCase()} solutions.`}
        image={project.hero}
        schema={[{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.name,
          "image": project.hero,
          "description": project.description,
          "creator": {
            "@type": "Organization",
            "name": "Credence Lighting"
          },
          "datePublished": project.year,
          "contentLocation": {
            "@type": "Place",
            "name": project.location
          }
        }]}
      />
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#b89b5e] rounded-full blur-[160px] opacity-[0.07]" />
        <div className="absolute top-[70%] right-[5%] w-[40%] h-[40%] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.07]" />
      </div>
      
      <BackButton />

      <section className="relative pt-24 md:pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto flex flex-col md:flex-row items-start gap-12 lg:gap-24">
        {/* LEFT: Scrollable Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-12 relative z-10">
          {project.gallery.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden rounded-xl border border-white/5 bg-[#111]"
            >
              <img
                src={imgSrc}
                alt={`${project.name} - Gallery Image ${idx + 1}`}
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Sticky Details */}
        <div className="w-full md:w-1/2 flex flex-col relative z-10 md:sticky md:top-32 md:pb-24">
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
            className="text-white text-fluid-h1 font-serif mb-6"
          >
            {project.name}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center text-white/50 uppercase tracking-[0.2em] text-xs md:text-xs mb-10 font-medium"
          >
            <span>{project.location}</span>
            <span className="w-1 h-1 rounded-full bg-[#c8a96b]" />
            <span>{project.year}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="mb-12 max-w-[600px]"
          >
            <p className="text-white/80 text-base md:text-lg leading-[1.8] font-light mb-10 text-justify">
              {project.description}
            </p>
              
            <div className="space-y-10 relative before:absolute before:inset-y-0 before:left-[3px] before:w-[1px] before:bg-gradient-to-b before:from-[#c8a96b]/50 before:via-[#c8a96b]/20 before:to-transparent pl-8">
              <div className="relative">
                <div className="absolute -left-[35px] top-1.5 w-2 h-2 rounded-full bg-[#c8a96b] shadow-[0_0_10px_#c8a96b]" />
                <h3 className="text-[#c8a96b] text-sm uppercase tracking-[0.2em] font-semibold mb-3">The Vision</h3>
                <p className="text-white/60 text-base md:text-lg leading-[1.8] font-light">
                  To craft a luminous environment that transcends basic illumination, merging architectural integrity with emotional resonance. We aimed to create a space that feels alive, adapting to the natural rhythm of its inhabitants while accentuating the structural grandeur.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[35px] top-1.5 w-2 h-2 rounded-full bg-[#c8a96b] shadow-[0_0_10px_#c8a96b]" />
                <h3 className="text-[#c8a96b] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Our Approach</h3>
                <p className="text-white/60 text-base md:text-lg leading-[1.8] font-light">
                  Deploying a meticulously curated selection of advanced, low-glare luminaires and intelligent control systems. Our design seamlessly integrates into the spatial geometry, ensuring that light acts as a subtle architectural material rather than a mere utility, eliminating harsh shadows and visual noise.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[35px] top-1.5 w-2 h-2 rounded-full bg-[#c8a96b] shadow-[0_0_10px_#c8a96b]" />
                <h3 className="text-[#c8a96b] text-sm uppercase tracking-[0.2em] font-semibold mb-3">The Outcome</h3>
                <p className="text-white/60 text-base md:text-lg leading-[1.8] font-light">
                  A breathtaking, immersive atmosphere that redefines the luxury experience. The dynamic lighting landscape not only elevates the aesthetic brilliance of the environment but also establishes a new paradigm for sustainable, human-centric design.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <PageLink
              to="/contact"
              className="inline-flex items-center justify-center bg-white/5 border border-white/5 text-white px-12 py-4 tracking-[0.2em] uppercase text-xs font-medium hover:bg-white hover:border-white hover:text-black transition-all duration-500 rounded-sm group"
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
              navigate(`/projects/${previousProject.slug}`);
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
              navigate(`/projects/${nextProject.slug}`);
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
