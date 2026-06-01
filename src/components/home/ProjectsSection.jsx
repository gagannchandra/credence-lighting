import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageLink from "../ui/PageLink";

import projects from "../../data/projects";

const ease = [0.22, 1, 0.36, 1];

function ProjectTile({ project, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease }}
      className="group relative w-full max-w-none overflow-hidden rounded-[2rem] h-[60vh] md:h-[80vh] min-h-[420px] md:min-h-[520px] bg-[#0a0a0a] shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      <img
        src={project.hero}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-black/85 via-black/10 to-transparent">
        <p className="uppercase tracking-[0.35em] text-[11px] text-[#d4b16a] mb-3">
          {project.category}
        </p>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
          {project.name}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm md:text-base">
          <span>{project.location}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#d4b16a]" />
          <span className="uppercase tracking-[0.2em] text-[#d4b16a] text-xs md:text-sm">
            {project.category}
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#d4b16a]" />
          <span>{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

function NavArrow({ direction, onClick, label }) {
  const isPrev = direction === "prev";

  return (
    <motion.button
      whileHover={{ x: isPrev ? -6 : 6, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={label}
      className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-xl border border-white/15 text-white/90 shadow-[0_0_40px_rgba(0,0,0,0.35)] hover:bg-black/80 hover:border-white/25 transition-all duration-300"
      style={{ [isPrev ? "left" : "right"]: "1.5rem" }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={isPrev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentIndex];

  return (
    <section id="projects" className="relative w-full bg-black min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-20 md:pt-24 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="uppercase tracking-[0.35em] text-xs text-[#d4b16a] mb-3">
            Portfolio
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-white leading-tight">
            Featured Projects
          </h2>
        </motion.div>
      </div>

      <div className="relative left-1/2 right-1/2 mx-[-50vw] w-screen px-4 md:px-6">
        <NavArrow direction="prev" onClick={prevProject} label="Previous project" />
        <NavArrow direction="next" onClick={nextProject} label="Next project" />

        <ProjectTile project={project} onClick={() => navigate(`/project/${project.id}`)} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-10 text-center text-white/50">
        <p className="text-sm font-serif tabular-nums">
          <span className="text-[#d4b16a]">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-white/20">|</span>
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="pb-16 md:pb-20 text-center"
      >
        <PageLink to="/gallery" returnHash="projects" className="inline-block">
          <button className="group relative px-10 md:px-12 py-4 md:py-5 border-2 border-[#d4b16a] text-[#d4b16a] font-serif text-lg tracking-[0.1em] overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-[#d4b16a] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ zIndex: -1 }}
            />
            <span className="group-hover:text-black transition-colors duration-500">
              View All Projects
            </span>
          </button>
        </PageLink>
      </motion.div>
    </section>
  );
}
