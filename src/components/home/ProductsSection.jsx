import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import products from "../../data/products";
import { scrollToSection } from "../../utils/scrollUtils";

const categories = [
  "All",
  "Indoor",
  "Outdoor",
  "Hospitality",
  "Facade",
  "Entertainment",
  "LED Screen",
  "Strech Ceiling",
  "Automation",
  "Retail",
  "Audio",
];

const categoryDescriptions = {
  Indoor: "Indoor Lighting offers a vast range of modern lighting products designed for residential, commercial, and architectural interiors. Powered by advanced lighting technology, our solutions deliver superior efficiency, comfort, and visual performance.",
  Outdoor: "Outdoor Lighting is designed to enhance exteriors with power, precision, and durability. Our extensive range of outdoor lighting solutions combines advanced technology with robust engineering to deliver high performance in all environments.",
  Hospitality: "Hospitality Lighting enhances ambience and guest experience through a wide range of refined lighting solutions. Powered by advanced technology, our lighting delivers visual comfort, elegance, and efficiency.",
  Facade: "Facade Lighting enhances architectural identity and visual impact with a wide range of advanced lighting solutions. Powered by cutting-edge technology, our systems deliver precise illumination and dynamic effects.",
  Entertainment: "Entertainment Lighting delivers high-impact visuals and immersive experiences through a wide range of dynamic lighting solutions. Powered by advanced control technology, our systems create precision effects, movement, and atmosphere.",
  "LED Screen": "LED Screens deliver powerful visual impact with a wide range of modern display solutions for indoor, outdoor, stage, and advertising applications. Powered by advanced display technology, our screens offer high brightness, clarity, and seamless performance.",
  "Strech Ceiling": "Stretch Ceiling Solutions enhance interiors with modern design, seamless finishes, and creative flexibility. Our wide range of stretch ceiling systems integrates advanced technology with precision fabrication for flawless results.",
  Automation: "Home Automation Systems bring comfort, control, and efficiency through a wide range of smart solutions. Powered by advanced technology, our systems seamlessly integrate lighting, climate, security, and AV control.",
  Retail: "Retail Lighting enhances product visibility and customer experience through a wide range of modern lighting solutions. Powered by advanced lighting technology, our systems deliver precise illumination, visual comfort, and energy efficiency.",
  Audio: "We deliver innovative audio solutions for residential, commercial, hospitality, and retail spaces. From background music and public address systems to conference and entertainment audio, our team provides complete design, supply, installation, and support.",
};

export default function ProductsSection() {
  const [active, setActive] = useState("All");
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const filteredProducts = active === "All" ? products.slice(0, 6) : products.filter((item) => item.category === active);
  const currentProduct = filteredProducts[activeProductIndex] || filteredProducts[0];

  // Representative product for each category (used in All view)
  const representativeProducts = categories
    .filter((c) => c !== "All")
    .map((c) => products.find((p) => p.category === c))
    .filter(Boolean);

  const handlePrev = () => {
    setActiveProductIndex((prev) => (prev === 0 ? filteredProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProductIndex((prev) => (prev === filteredProducts.length - 1 ? 0 : prev + 1));
  };

  const handleEnquireClick = () => {
    scrollToSection("contact");
  };

  // Auto-slide for category view
  useEffect(() => {
    if (active !== "All" && filteredProducts.length > 1) {
      const interval = setInterval(() => {
        setActiveProductIndex((prev) => (prev === filteredProducts.length - 1 ? 0 : prev + 1));
      }, 5000); // 5 seconds auto-slide
      return () => clearInterval(interval);
    }
  }, [active, filteredProducts.length]);

  // Bento Box Layout configurations for 'All' view (Perfect Rectangle for 8 items)
  const getBentoClasses = (index) => {
    const patterns = [
      "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2", // Item 0
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 1
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 2
      "md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2", // Item 3
      "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 4
      "md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1", // Item 5 (Changed to 2x1 to fill the gap)
      "md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1", // Item 6 (Changed to 1x1)
      "md:col-span-2 md:row-span-1 lg:col-span-4 lg:row-span-1", // Item 7
    ];
    return patterns[index % 8];
  };

  return (
    <section id="products" className="min-h-screen bg-[#050505] text-white px-4 md:px-12 py-20 md:py-24 relative overflow-hidden">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#b89b5e] rounded-full blur-[150px] opacity-10" />
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] bg-[#b89b5e] rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="uppercase tracking-[0.4em] text-[11px] text-[#b89b5e] mb-6 font-semibold">
              Premium Collection
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight">
              Our Product <span className="italic text-[#c8a96b] font-light">Range</span>
            </h2>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: "#c8a96b", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnquireClick} 
            className="w-full md:w-auto border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-8 py-4 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full flex items-center justify-center gap-3 group"
          >
            Enquire Now 
            <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
          </motion.button>
        </div>

        {/* Category Filters with Sliding Indicator */}
        <div className="flex flex-wrap gap-2 mb-20 relative z-20">
          {categories.map((item) => {
            const isActive = active === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setActiveProductIndex(0);
                }}
                className={`relative px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors duration-300 rounded-full overflow-hidden ${
                  isActive ? "text-black font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#d4b16a] to-[#b89b5e] shadow-[0_0_20px_rgba(200,169,107,0.4)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>

        {/* Display Mode: All vs Category */}
        <div className="min-h-[600px]">
          {active === "All" ? (
            // Bento Grid View for All Categories
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] grid-flow-dense"
            >
              <AnimatePresence mode="wait">
                {representativeProducts.slice(0, 8).map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 bg-[#111] ${getBentoClasses(index)}`}
                    onClick={() => {
                      setActive(item.category);
                      setActiveProductIndex(0);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.08] opacity-80 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="uppercase tracking-[0.3em] text-[10px] text-[#c8a96b] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Explore Collection
                      </p>
                      <h3 className="text-white text-2xl md:text-3xl font-serif leading-tight">{item.category}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Featured View for Specific Category - Snapchat Style
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[70vh] min-h-[600px] rounded-[2.5rem] overflow-hidden group select-none"
            >
              {/* Massive Background Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct?.id || 'empty'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 z-0"
                >
                  {currentProduct ? (
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111]" />
                  )}
                  {/* Gradient Overlays for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Snapchat-style click zones */}
              <div className="absolute inset-0 z-10 flex cursor-pointer">
                <div 
                  className="w-1/2 h-full opacity-0 hover:opacity-10 transition-opacity flex items-center justify-start pl-8" 
                  onClick={handlePrev}
                >
                  {/* Optional visual hint on hover (left edge) */}
                  <div className="w-24 h-full bg-gradient-to-r from-white to-transparent" />
                </div>
                <div 
                  className="w-1/2 h-full opacity-0 hover:opacity-10 transition-opacity flex items-center justify-end pr-8" 
                  onClick={handleNext}
                >
                  {/* Optional visual hint on hover (right edge) */}
                  <div className="w-24 h-full bg-gradient-to-l from-white to-transparent" />
                </div>
              </div>

              {/* Top Left Topic Overlay */}
              <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#c8a96b]" />
                <p className="uppercase tracking-[0.3em] text-[11px] text-[#c8a96b] font-semibold drop-shadow-md">
                  {active} Collection
                </p>
              </div>

              {/* Bottom Description Overlay */}
              <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-20 pointer-events-none max-w-4xl">
                <p className="text-white/90 text-sm md:text-lg leading-[1.8] font-light shadow-black drop-shadow-lg">
                  {categoryDescriptions[active]}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
