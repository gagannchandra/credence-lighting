import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import bgHorizontal from "../../assets/images/homepage/horizontal.webp";
import bgVertical from "../../assets/images/homepage/vertical.webp";
import FadeUp from "../ui/motion/FadeUp";

export default function Hero() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth cursor
  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  // Spotlight mask
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(circle 350px at ${x}px ${y}px, black 0%, transparent 100%)`
  );

  const glowBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 70%)`
  );

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}

      className="relative h-screen w-full bg-transparent flex items-center justify-center overflow-hidden"
    >
      {/* B&W IMAGE */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={bgHorizontal} />
          <img
            src={bgVertical}
            alt="Luxury Interior"
            className="w-full h-full object-cover grayscale brightness-[0.25] transition-all duration-700"
          />
        </picture>
      </div>

      {/* COLOR REVEAL - DESKTOP */}
      <motion.div
        className="hidden md:block absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${bgHorizontal})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      {/* GLOW */}
      <motion.div
        className="hidden md:block absolute inset-0 z-10 pointer-events-none"
        style={{ background: glowBackground }}
      />

      {/* CONTENT */}
      <div className="relative z-20 text-center px-6 max-w-5xl pointer-events-none flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <span className="sr-only">Premium Lighting Solutions Dubai</span>
          <span className="text-white text-fluid-h1 font-serif" aria-hidden="true">
            Luminous
          </span>
          <span className="italic gold-gradient-text text-fluid-h1 font-serif mt-2" aria-hidden="true">
            Sophistication
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="text-white/70 mt-8 text-fluid-p tracking-wide"
        >
          Where Premium Design Meets Functional Excellence
        </motion.p>
      </div>

      {/* SCROLL INDICATOR */}
      <FadeUp delay={10} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="uppercase tracking-[0.3em] text-[9px] text-brand-gold/80">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-brand-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </FadeUp>


    </section>
  );
}