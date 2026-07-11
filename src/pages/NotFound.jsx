import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTransition from "../components/ui/motion/PageTransition";

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const particles = [...Array(18)].map(() => ({
    // eslint-disable-next-line react-hooks/purity
    left: `${Math.random() * 100}%`,
    // eslint-disable-next-line react-hooks/purity
    top: `${Math.random() * 100}%`,
  }));

  useEffect(() => {
    if (shouldReduceMotion) return;
    const moveLight = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", moveLight);

    return () => {
      window.removeEventListener("mousemove", moveLight);
    };
  }, [shouldReduceMotion]);

  return (
    <PageTransition>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="relative min-h-screen bg-transparent overflow-hidden flex items-center justify-center">

      {/* INTERACTIVE LIGHT */}
      <div
        className="absolute inset-0 transition duration-200"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(200,169,107,0.28), transparent 20%)`,
        }}
      />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* FLOATING PARTICLES */}
      {!shouldReduceMotion && particles.map((pos, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
          }}
          className="absolute w-1 h-1 bg-brand-gold rounded-button"
          style={pos}
        />
      ))}

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* ERROR CODE */}
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="text-[120px] md:text-[240px] font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-gold"
        >
          404
        </motion.h1>

        {/* TITLE */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 1,
          }}
          className="text-fluid-h1 text-white font-serif "
        >
          Power
          <span className="italic text-brand-gold">
            {" "}Failure
          </span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 1,
          }}
          className="mt-8 text-white/50 text-lg md:text-xl leading-[1.8] max-w-3xl mx-auto"
        >
          The lighting system couldn’t locate the requested
          destination. The pathway appears disconnected from
          the current network.
        </motion.p>

        {/* FAKE CONTROL PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 1,
          }}
          className="mt-16 border border-white/10 bg-white/[0.03] backdrop-blur-2xl rounded-[30px] p-8 md:p-10 max-w-2xl mx-auto"
        >

          {/* LIGHT STATUS */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">

            <p className="text-white/40 uppercase tracking-[0.3em] text-xs">
              System Status
            </p>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-button bg-red-500 animate-pulse" />

              <p className="text-red-400 text-xs uppercase tracking-[0.2em]">
                Offline
              </p>
            </div>

          </div>

          {/* BARS */}
          <div className="flex items-end justify-center gap-3 h-28 mt-10">

            {[40, 80, 55, 100, 70, 50, 90].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${h}%`, `${h - 25}%`, `${h}%`],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-6 rounded-button bg-gradient-to-t from-brand-gold to-white"
              />
            ))}

          </div>

          {/* BUTTON */}
          <div className="mt-12 flex justify-center">

            <Link
              to="/"
              className="group bg-brand-gold text-black px-10 py-5 uppercase tracking-[0.3em] text-xs hover:bg-white transition duration-500"
            >
              Restore Connection

              <span className="inline-block ml-3 group-hover:translate-x-1 transition duration-300">
                →
              </span>
            </Link>

          </div>

        </motion.div>

      </div>

      </section>
    </PageTransition>
  );
}