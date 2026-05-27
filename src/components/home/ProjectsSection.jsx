import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLink from "../ui/PageLink";

const projects = [
  {
    id: 1,
    name: "Xtreme Zone",
    location: "Al Shifa, Dammam, Saudi Arabia",
    year: "2024",
    category: "Linear Lighting",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
  },

  {
    id: 2,
    name: "My Town",
    location: "Jeddah Village Mall, Saudi Arabia",
    year: "2024",
    category: "Architectural Lighting",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000",
  },

  {
    id: 3,
    name: "Ground Control",
    location: "Galleria Mall, Bahrain",
    year: "2024",
    category: "Entertainment Lighting",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000",
  },

  {
    id: 4,
    name: "Funtura",
    location: "Al Atyaf Mall, Riyadh",
    year: "2024",
    category: "Interactive Lighting",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000",
  },
];

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

const nextSlide = () => {
  setLoaded(false);

  setCurrent((prev) =>
    prev === projects.length - 1 ? 0 : prev + 1
  );
};

const prevSlide = () => {
  setLoaded(false);

  setCurrent((prev) =>
    prev === 0 ? projects.length - 1 : prev - 1
  );
};

  return (
    <section 
    id="projects"
    className="relative h-screen w-full overflow-hidden bg-black">

      {/* SLIDES */}
      <AnimatePresence mode="wait">

        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <PageLink
            to={`/project/${projects[current].id}`}
            returnHash="#projects"
          >

            {/* IMAGE */}
           <img
  src={projects[current].image}
  alt={projects[current].name}
  onLoad={() => setLoaded(true)}
  className={`w-full h-full object-cover transition duration-700 ${
    loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
  }`}
/>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/30" />

            {/* BOTTOM GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* CONTENT */}
           <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{
    opacity: loaded ? 1 : 0,
    y: loaded ? 0 : 50,
  }}
  transition={{
    duration: 0.8,
    delay: 0.2,
  }}
  className="absolute bottom-0 left-0 w-full p-8 md:p-16"
>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="uppercase tracking-[0.4em] text-xs text-[#d4b16a] mb-5"
              >
                Our Recent Projects
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-5xl md:text-8xl font-serif leading-none"
              >
                {projects[current].name}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-8"
              >
                <p className="text-white/70 text-lg">
                  {projects[current].location}
                </p>

                <p className="text-[#d4b16a] uppercase tracking-[0.2em] text-sm">
                  {projects[current].category}
                </p>

                <p className="text-white/50">
                  {projects[current].year}
                </p>
              </motion.div>

            </motion.div>
          </PageLink>
        </motion.div>

      </AnimatePresence>

      {/* ARROWS */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">

        <button
          onClick={prevSlide}
          className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-500"
        >
          <ArrowLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-500"
        >
          <ArrowRight size={22} />
        </button>

      </div>

    </section>
  );
}