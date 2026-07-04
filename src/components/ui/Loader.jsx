import { motion, useReducedMotion } from "framer-motion";
import logo1 from "../../assets/images/logo1.webp";

export default function Loader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">

      {/* GOLD AMBIENT GLOW */}
      <div className="absolute w-[700px] h-[700px] bg-[#c8a96b]/10 blur-[180px]" />

      {/* GRID LIGHT EFFECT */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center">

        <motion.img
          src={logo1}
          alt="Credence Lighting"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1 }}
          className="h-16 md:h-24 w-auto object-contain"
        />

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.4,
            duration: shouldReduceMotion ? 0 : 1,
          }}
          className="mt-5 text-[#c8a96b] uppercase tracking-[0.45em] text-xs md:text-xs text-center"
        >
          Innovative Lighting • Integrated Solutions
        </motion.p>

        {/* LIGHT BAR */}
        <div className="mt-10 w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: shouldReduceMotion ? "0%" : "250%" }}
            transition={{
              duration: 1.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "linear",
            }}
            className={`h-full bg-[#c8a96b] ${shouldReduceMotion ? 'w-full' : 'w-24'}`}
          />

        </div>

        {/* LOADING */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldReduceMotion ? 1 : [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
          className="mt-6 text-white/40 uppercase tracking-[0.35em] text-xs"
        >
          Initializing Experience
        </motion.p>

      </div>

    </div>
  );
}