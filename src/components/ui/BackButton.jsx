import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getReturnState,
  markPendingReturnScroll,
} from "../../utils/navigationState";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    const returnState = getReturnState();

    if (returnState?.pathname) {
      markPendingReturnScroll();
      navigate(returnState.pathname);
      return;
    }

    navigate(-1);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleBack}
      className="
        fixed
        top-7
        left-7
        z-[100]
        flex
        items-center
        gap-3
        border
        border-white/10
        bg-black/40
        backdrop-blur-xl
        px-5
        py-3
        rounded-full
        text-white
        hover:border-[#c8a96b]
        hover:text-[#c8a96b]
        transition-all
        duration-500
      "
    >
      <ArrowLeft size={18} />

      <span className="uppercase tracking-[0.25em] text-[10px]">
        Back
      </span>
    </motion.button>
  );
}
