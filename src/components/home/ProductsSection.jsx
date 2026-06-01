import { useState } from "react";
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
];

const categoryDescriptions = {
  Indoor: "Explore our luxury indoor lighting systems designed for modern architectural spaces, premium interiors, commercial environments, and immersive experiences.",
  Outdoor: "Premium outdoor lighting solutions for facades, landscapes, and exterior architectural applications.",
  Hospitality: "Elegant lighting for hotels, restaurants, lounges, and hospitality venues.",
  Facade: "Architectural lighting systems for building facades and exterior lighting wash effects.",
  Entertainment: "Professional entertainment and stage lighting for events, concerts, and performances.",
  "LED Screen": "High-resolution LED video walls and display screens for advertising and events.",
  "Strech Ceiling": "Modern stretch ceiling systems with integrated lighting solutions.",
  Automation: "Smart lighting control systems with voice, app, and sensor capabilities.",
  Retail: "Retail and custom lighting solutions including neon sign systems.",
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
    // Scroll to Contact section on the page
    scrollToSection("contact");
  };

  return (
    <section id="products" className="min-h-screen bg-[#f5f2eb] px-6 md:px-12 py-24">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-6">What We Offer</p>
            <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight">
              Our Product <span className="italic text-[#c8a96b]">Range</span>
            </h2>
          </div>

          <button onClick={handleEnquireClick} className="border border-[#c8a96b] text-[#c8a96b] px-8 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#c8a96b] hover:text-white transition duration-500">
            Enquire Now →
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActive(item);
                setActiveProductIndex(0);
              }}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] border transition duration-300 ${
                active === item ? "bg-[#c8a96b] text-white border-[#c8a96b]" : "border-black/10 text-black/60 hover:border-[#c8a96b] hover:text-[#c8a96b]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Display Mode: All vs Category */}
        {active === "All" ? (
          // Tile Grid View for All Categories (one representative image each)
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {representativeProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    setActive(item.category);
                    setActiveProductIndex(0);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-serif">{item.category}</h3>
                    <p className="text-[#d4b16a] text-xs tracking-[0.2em] uppercase mt-2">View {item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Featured View for Specific Category
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Info & Navigation */}
            <div className="flex flex-col justify-center">
              <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-6">Premium Collection</p>
              <h3 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-8">
                {active} <span className="italic text-[#c8a96b]">Solutions</span>
              </h3>

              <p className="text-black/60 text-lg leading-8 mb-12">
                {categoryDescriptions[active]}
              </p>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border-2 border-[#c8a96b] text-[#c8a96b] flex items-center justify-center hover:bg-[#c8a96b] hover:text-white transition duration-300"
                  aria-label="Previous product"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border-2 border-[#c8a96b] text-[#c8a96b] flex items-center justify-center hover:bg-[#c8a96b] hover:text-white transition duration-300"
                  aria-label="Next product"
                >
                  →
                </button>
              </div>

              {/* Product Counter */}
              <p className="text-sm text-black/50 mt-8">
                Showing {activeProductIndex + 1} of {filteredProducts.length}
              </p>
            </div>

            {/* Right Side - Product Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden h-96 md:h-full md:min-h-[500px] shadow-2xl"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-white text-3xl md:text-4xl font-serif">{currentProduct.title}</h4>
                  <p className="text-[#d4b16a] text-sm tracking-[0.2em] uppercase mt-3">{currentProduct.subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
