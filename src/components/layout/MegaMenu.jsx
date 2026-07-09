import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function MegaMenu({ item, active, setActive }) {
  const isOpen = active === item.name;
  const location = useLocation();
  const isActiveRoute = location.pathname.startsWith(item.to) || (item.dropdown && item.dropdown.some(link => location.pathname === link.to));

  return (
    <div
      onMouseEnter={() => setActive(item.name)}
      onMouseLeave={() => setActive(null)}
      className="relative h-full flex items-center"
    >
      <Link
        to={item.to || "#"}
        className={`text-sm uppercase tracking-[0.08em] transition-colors duration-300 relative py-2 ${
          isActiveRoute ? "text-white font-medium" : "text-white/70 hover:text-white"
        }`}
      >
        {item.name}
        {/* Active Underline Indicator */}
        {isActiveRoute && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[500px] bg-[#050505]/95 backdrop-blur-3xl border border-white/5 rounded-xl p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Links Column */}
              <div className="flex flex-col gap-3">
                {item.dropdown.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors text-sm tracking-wide flex items-center gap-2 group py-1"
                    onClick={() => setActive(null)}
                  >
                    <span className="w-0 h-[1px] bg-[#c8a96b] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                ))}
              </div>
              {/* Image/Featured Column */}
              {item.featured && (
                <div className="relative rounded-lg overflow-hidden group h-full bg-[#111]">
                  <img
                    src={item.featured.image}
                    alt={item.featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <p className="text-white font-serif text-lg leading-tight">{item.featured.title}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
