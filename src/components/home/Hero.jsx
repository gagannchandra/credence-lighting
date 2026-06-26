import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import bgHorizontal from "../../assets/images/homepage/horizontal.webp";
import bgVertical from "../../assets/images/homepage/vertical.webp";

export default function Hero() {
  const containerRef = useRef(null);
  const [insideHero, setInsideHero] = useState(false);
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
      onMouseEnter={() => setInsideHero(true)}
      onMouseLeave={() => setInsideHero(false)}
      className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden lg:cursor-none"
    >
      {/* B&W IMAGE */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={bgHorizontal} />
          <img
            src={bgVertical}
            alt="Luxury Interior"
            className="w-full h-full object-cover grayscale brightness-[0.25]"
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

      {/* COLOR REVEAL - MOBILE */}
      <motion.div
        className="block md:hidden absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${bgVertical})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      {/* GLOW */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 70%)`
          ),
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 text-center px-6 max-w-5xl pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl sm:text-5xl md:text-7xl font-serif leading-tight"
        >
          Luminous
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="italic text-[#c8a96b] text-4xl sm:text-5xl md:text-7xl font-serif mt-2"
        >
          Sophistication
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 mt-8 text-lg tracking-wide"
        >
          Where Premium Design Meets Functional Excellence
        </motion.p>
      </div>

      {/* CUSTOM CURSOR */}
      {insideHero && (
        <motion.div
          className="fixed top-0 left-0 w-5 h-5 rounded-full border border-white z-50 pointer-events-none hidden lg:block"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </section>
  );
}