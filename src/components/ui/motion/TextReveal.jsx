import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "../../../utils/motion";

export default function TextReveal({
  text,
  as: Component = "p",
  className = "",
  delay = 0,
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  // Split text by lines for line-by-line reveal
  // We can just split by words for a generic word reveal if we prefer
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * 0.1 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.standard,
        ease: ease.standard,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
