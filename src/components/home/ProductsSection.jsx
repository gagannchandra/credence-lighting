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
  "Audio",
];

const categoryDescriptions = {
  Indoor: "Indoor Lighting offers a vast range of modern lighting products designed for residential, commercial, and architectural interiors. Powered by advanced lighting technology, our solutions deliver superior efficiency, comfort, and visual performance. Built with high-quality, reliable, and durable components, our indoor lighting ensures long-lasting performance and consistent results.",
  Outdoor: "Outdoor Lighting is designed to enhance exteriors with power, precision, and durability. Our extensive range of outdoor lighting solutions combines advanced technology with robust engineering to deliver high performance in all environments. Built to withstand harsh conditions, our fixtures are high-quality, reliable, and long-lasting, ensuring consistent illumination and visual impact over time.",
  Hospitality: "Hospitality Lighting enhances ambience and guest experience through a wide range of refined lighting solutions. Powered by advanced technology, our lighting delivers visual comfort, elegance, and efficiency. Built with high-quality, reliable, and durable components, it ensures lasting performance.",
  Facade: "Facade Lighting enhances architectural identity and visual impact with a wide range of advanced lighting solutions. Powered by cutting-edge technology, our systems deliver precise illumination and dynamic effects. Built with high-quality, reliable, and durable components, our facade lighting ensures long-lasting performance in all conditions.",
  Entertainment: "Entertainment Lighting delivers high-impact visuals and immersive experiences through a wide range of dynamic lighting solutions. Powered by advanced control technology, our systems create precision effects, movement, and atmosphere. Built with high-quality, reliable, and durable components, our lighting performs flawlessly in demanding entertainment environments.",
  "LED Screen": "LED Screens deliver powerful visual impact with a wide range of modern display solutions for indoor, outdoor, stage, and advertising applications. Powered by advanced display technology, our screens offer high brightness, clarity, and seamless performance. Built with high-quality, reliable, and durable components, they ensure long-lasting visuals and consistent operation.",
  "Strech Ceiling": "Stretch Ceiling Solutions enhance interiors with modern design, seamless finishes, and creative flexibility. Our wide range of stretch ceiling systems integrates advanced technology with precision fabrication for flawless results. Built with high-quality, reliable, and durable materials, they ensure long-lasting performance and visual elegance.",
  Automation: "Home Automation Systems bring comfort, control, and efficiency through a wide range of smart solutions. Powered by advanced technology, our systems seamlessly integrate lighting, climate, security, and AV control. Built with high-quality, reliable, and durable components, they ensure smooth operation and long-term performance.",
  Retail: "Retail Lighting enhances product visibility and customer experience through a wide range of modern lighting solutions. Powered by advanced lighting technology, our systems deliver precise illumination, visual comfort, and energy efficiency. Built with high-quality, reliable, and durable components, our retail lighting ensures consistent performance and lasting impact.",
  Audio: "We deliver innovative audio solutions for residential, commercial, hospitality, and retail spaces. From background music and public address systems to conference and entertainment audio, our team provides complete design, supply, installation, and support to ensure outstanding sound performance and reliability.",
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
    <section id="products" className="min-h-screen bg-[#f5f2eb] px-4 md:px-12 py-20 md:py-24">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-6">What We Offer</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-black leading-tight">
              Our Product <span className="italic text-[#c8a96b]">Range</span>
            </h2>
          </div>

          <button onClick={handleEnquireClick} className="w-full md:w-auto border border-[#c8a96b] text-[#c8a96b] px-6 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#c8a96b] hover:text-white transition duration-500">
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
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] border transition duration-300 ${active === item ? "bg-[#c8a96b] text-white border-[#c8a96b]" : "border-black/10 text-black/60 hover:border-[#c8a96b] hover:text-[#c8a96b]"
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
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
