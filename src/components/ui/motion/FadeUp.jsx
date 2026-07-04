import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants } from "../../../utils/motion";

export default function FadeUp({ 
  children, 
  delay = 0, 
  className = "", 
  once = true, 
  amount = 0.2,
  as: Component = "div" 
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[Component] || motion.div;

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <MotionComponent
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
