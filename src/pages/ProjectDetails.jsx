import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import Lightbox from "../components/ui/Lightbox";

import projects from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((item) => item.id === Number(id));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentIndex = projects.findIndex((item) => item.id === Number(id));
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white text-3xl">
        Project Not Found
      </div>
    );
  }

  return (
    <main className="bg-[#f5f2eb] min-h-screen">
      <BackButton />

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={project.hero}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-12 left-8 md:left-16 z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.35em] text-xs text-[#d4b16a] mb-4"
          >
            Our Recent Projects
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6"
          >
            {project.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 md:gap-8 text-white/80 text-sm md:text-base"
          >
            <span>{project.location}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#d4b16a]" />
            <span className="uppercase tracking-[0.2em] text-[#d4b16a] text-xs md:text-sm">{project.category}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#d4b16a]" />
            <span>{project.year}</span>
          </motion.div>
        </div>

        <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 flex gap-4 z-10">
          {previousProject && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate(`/project/${previousProject.id}`)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:border-[#d4b16a] hover:text-[#d4b16a] transition duration-300"
              aria-label="Previous project"
            >
              <span className="text-xl md:text-2xl">←</span>
            </motion.button>
          )}
          {nextProject && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:border-[#d4b16a] hover:text-[#d4b16a] transition duration-300"
              aria-label="Next project"
            >
              <span className="text-xl md:text-2xl">→</span>
            </motion.button>
          )}
        </div>
      </section>

      {/* OVERVIEW + GALLERY */}
      <section className="w-full px-4 md:px-8 lg:px-12 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-4">Project Overview</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-black mb-4">
              Intelligent <span className="italic text-[#c8a96b]">Lighting</span>
            </h2>
            <p className="text-black/75 text-base md:text-lg leading-8">{project.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-3 mt-10"
          >
            <div className="rounded-[1.75rem] bg-white p-5 md:p-6 shadow-xl border border-black/10">
              <p className="uppercase tracking-[0.35em] text-[10px] text-[#b89b5e] mb-2">Location</p>
              <p className="text-black/75 text-sm md:text-base">{project.location}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-5 md:p-6 shadow-xl border border-black/10">
              <p className="uppercase tracking-[0.35em] text-[10px] text-[#b89b5e] mb-2">Category</p>
              <p className="text-black/75 text-sm md:text-base">{project.category}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-5 md:p-6 shadow-xl border border-black/10">
              <p className="uppercase tracking-[0.35em] text-[10px] text-[#b89b5e] mb-2">Year</p>
              <p className="text-black/75 text-sm md:text-base">{project.year}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-6">Project Gallery</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="overflow-hidden rounded-[1.75rem] group cursor-pointer"
                  aria-label={`Open ${project.name} gallery image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${project.name} gallery ${index + 1}`}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={project.gallery}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % project.gallery.length)}
        />
      )}
    </main>
  );
}
