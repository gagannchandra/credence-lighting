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

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/gallery");
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleBack}
      className="fixed top-5 left-5 z-[100] flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white text-sm font-semibold tracking-[0.2em] uppercase shadow-2xl backdrop-blur-lg border border-white/10 hover:bg-black/70 hover:border-white/20 transition duration-300"
    >
      <ArrowLeft size={16} />
      <span>Back</span>
    </motion.button>
  );
}
