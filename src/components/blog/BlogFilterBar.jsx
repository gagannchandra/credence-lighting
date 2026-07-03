import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogFilterBar({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory,
  categories 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="sticky top-[80px] z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/5 py-4 mb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        
        {/* Desktop Categories */}
        <div className="hidden md:flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-colors duration-300 ${
              activeCategory === "All"
                ? "bg-[#c8a96b] text-black font-semibold"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#c8a96b] text-black font-semibold"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 text-white/60 text-sm border border-white/10 px-4 py-2 rounded-full"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#c8a96b]/50 transition-colors"
            />
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Categories Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#111111] border-t border-white/5 mt-4"
          >
            <div className="p-6 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveCategory("All"); setIsFilterOpen(false); }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider ${
                  activeCategory === "All" ? "bg-[#c8a96b] text-black" : "bg-white/5 text-white/60"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider ${
                    activeCategory === cat ? "bg-[#c8a96b] text-black" : "bg-white/5 text-white/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
