import { motion, useReducedMotion } from "framer-motion";
import PageLink from "../ui/PageLink";
import TextReveal from "../ui/motion/TextReveal";
import FadeUp from "../ui/motion/FadeUp";
import HoverLift from "../ui/motion/HoverLift";
import { ease } from "../../utils/motion";

const featuredLogos = [
  "/brands/al-othaim.webp",
  "/brands/fitness-first.webp",
  "/brands/fabyland.webp",
  "/brands/emaar.webp",
  "/brands/fun-city.webp",
  "/brands/gemo.webp",
  "/brands/ground-control.webp",
  "/brands/xtreme.webp",
  "/brands/flipped.webp",
  "/brands/funco.webp",
  "/brands/lpme.webp",
  "/brands/adventureland.webp",
];

export default function BrandsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="brands"
      className="relative bg-transparent z-10 py-28 overflow-hidden"
    >
      <div className="relative z-10">

        {/* TOP */}
        <div className="text-center px-6">
          <FadeUp delay={0}>
            <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
              Trusted By
            </p>
          </FadeUp>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight flex flex-wrap justify-center gap-2">
            <TextReveal text="Brands We" />
            <TextReveal text="Work With" delay={2} className="italic text-[#c8a96b]" />
          </h2>

          <FadeUp delay={4}>
            <p className="mt-8 text-white/50 max-w-2xl mx-auto leading-8">
              Collaborating with globally recognized brands,
              entertainment destinations, retail leaders,
              and architectural innovators across multiple countries.
            </p>
          </FadeUp>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 px-6">
          {[
            { number: "30+", label: "Global Brands" },
            { number: "7+", label: "Countries" },
            { number: "1000+", label: "Installations" },
          ].map((item, i) => (
            <FadeUp key={item.label} delay={6 + i * 2} className="text-center">
              <h3 className="text-4xl md:text-5xl text-white font-serif">
                {item.number}
              </h3>
              <p className="text-white/40 uppercase tracking-[0.3em] text-xs mt-3">
                {item.label}
              </p>
            </FadeUp>
          ))}
        </div>

        {/* LOGO SECTION */}
        <div className="relative mt-24">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 w-32 md:w-52 h-full z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 w-32 md:w-52 h-full z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          {/* GLASS WRAPPER */}
          <div className="border-y border-white/10 bg-white/[0.03] backdrop-blur-2xl py-14 overflow-hidden">

            <motion.div
              drag="x"
              dragConstraints={{ left: -1200, right: 0 }}
              animate={{ x: shouldReduceMotion ? "0%" : ["0%", "-50%"] }}
              transition={{
                duration: 120,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-20 md:gap-28 min-w-max px-10 cursor-grab active:cursor-grabbing"
            >
              {[...featuredLogos, ...featuredLogos].map(
                (logo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                    }}
                    transition={{
                      duration: 0.4, ease: ease.standard
                    }}
                    className="flex items-center justify-center w-[180px] md:w-[240px]"
                  >
                    <img
                      src={logo}
                      alt=""
                      draggable="false"
                      className="h-16 md:h-24 object-contain opacity-80 hover:opacity-100 transition duration-500 select-none"
                    />
                  </motion.div>
                )
              )}
            </motion.div>

          </div>

        </div>

        {/* BUTTON */}
        <FadeUp delay={12} className="flex justify-center mt-16">
          <HoverLift>
            <PageLink
              to="/brands"
              returnHash="#brands"
              className="group border border-[#c8a96b]/40 text-[#c8a96b] px-10 py-5 uppercase tracking-[0.3em] text-xs hover:bg-[#c8a96b] hover:text-black transition duration-500 flex items-center justify-center"
            >
              View All Partners

              <span className="inline-block ml-3 group-hover:translate-x-1 transition duration-300">
                →
              </span>
            </PageLink>
          </HoverLift>
        </FadeUp>

      </div>
    </section>
  );
}