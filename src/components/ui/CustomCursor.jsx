import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const isClickable = e.target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select');
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body, a, button, input, textarea, select, .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full hidden md:flex items-center justify-center border"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
          backgroundColor: isHovered ? "rgba(200, 169, 107, 0.08)" : "#ffffff",
          borderColor: isHovered ? "rgba(200, 169, 107, 0.4)" : "transparent",
          backdropFilter: isHovered ? "blur(2px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      >
        {isHovered && (
          <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0, opacity: 0 }}
             transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
             className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]"
          />
        )}
      </motion.div>
    </>
  );
}
