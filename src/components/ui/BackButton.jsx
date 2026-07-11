import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getReturnState,
  clearReturnState,
  markPendingReturnScroll,
} from "../../utils/navigationState";

export default function BackButton({ fallback }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const returnState = getReturnState();

    if (returnState?.pathname) {
      markPendingReturnScroll();
      clearReturnState(); // Clear the state so it doesn't contaminate future back clicks
      navigate(returnState.pathname);
      return;
    }

    // location.key is "default" on the very first page load of a tab.
    // If it's not default, we have internal app history to go back to.
    if (location.key !== "default") {
      navigate(-1);
      return;
    }

    // If we landed directly on this page (no history), determine a smart fallback
    let defaultFallback = "/";
    if (location.pathname.startsWith("/product")) defaultFallback = "/products";
    else if (location.pathname.startsWith("/project")) defaultFallback = "/projects";
    else if (location.pathname.startsWith("/blog")) defaultFallback = "/blog";

    navigate(fallback || defaultFallback);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleBack}
      className="fixed top-32 left-12 z-[100] hidden md:flex items-center gap-2 rounded-button bg-transparent/50 px-4 py-2 text-white text-sm font-semibold tracking-[0.2em] uppercase shadow-2xl backdrop-blur-lg border border-white/10 hover:bg-transparent/70 hover:border-white/20 transition duration-300"
    >
      <ArrowLeft size={16} />
      <span>Back</span>
    </motion.button>
  );
}
