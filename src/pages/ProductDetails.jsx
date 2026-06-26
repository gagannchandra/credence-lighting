import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import category images
import indoor10 from "../assets/images/indoor/1.png";
import outdoor19 from "../assets/images/outdoor/1.png";
import hospitality29 from "../assets/images/hospitality/1.png";
import facade37 from "../assets/images/facade/1.png";
import entertainment48 from "../assets/images/entertainment/1.png";
import ledscreen56 from "../assets/images/led-screen/1.png";
import strech64 from "../assets/images/strech-ceiling/20C9BA80-EAC4-4F42-B725-D901580BB9B7.png";
import automation88 from "../assets/images/Home Automation/1.jpeg";
import retail72 from "../assets/images/Retail Lighting/1.png";

const productCategories = [
  {
    id: 1,
    title: "LED Downlights",
    subtitle: "RECESSED • SURFACE • ADJUSTABLE",
    image: indoor10,
    category: "Indoor",
    span: "large",
  },
  {
    id: 2,
    title: "Track & Spotlights",
    subtitle: "RETAIL • GALLERY • COMMERCIAL",
    image: outdoor19,
    category: "Outdoor",
    span: "small",
  },
  {
    id: 3,
    title: "Facade Lighting",
    subtitle: "ARCHITECTURAL • BUILDING WASH",
    image: facade37,
    category: "Facade",
    span: "large",
  },
  {
    id: 4,
    title: "LED Video Walls",
    subtitle: "EVENTS • STAGES • ADVERTISING",
    image: ledscreen56,
    category: "LED Screen",
    span: "medium",
  },
  {
    id: 5,
    title: "Smart Controls",
    subtitle: "VOICE • APP • SENSOR",
    image: automation88,
    category: "Automation",
    span: "small",
  },
  {
    id: 6,
    title: "Neon Sign Systems",
    subtitle: "CUSTOM • RETAIL • BRANDING",
    image: retail72,
    category: "Retail",
    span: "small",
  },
  {
    id: 7,
    title: "Hospitality Lighting",
    subtitle: "HOTELS • RESTAURANTS • LOUNGES",
    image: hospitality29,
    category: "Hospitality",
    span: "medium",
  },
  {
    id: 8,
    title: "Entertainment Lighting",
    subtitle: "THEATERS • CLUBS • VENUES",
    image: entertainment48,
    category: "Entertainment",
    span: "small",
  },
  {
    id: 9,
    title: "Stretch Ceiling Systems",
    subtitle: "MODERN • SEAMLESS • ELEGANT",
    image: strech64,
    category: "Stretch Ceiling",
    span: "small",
  },
];

export default function ProductDetails() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleCategoryClick = (category) => {
    // Navigate or filter products by category
    navigate("/", { state: { selectedCategory: category } });
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      {/* Header */}
      <div className="bg-black text-white py-20 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <p className="uppercase tracking-[0.4em] text-xs text-[#b89b5e] mb-6">Our Collection</p>
          <h1 className="text-5xl md:text-7xl font-serif">
            Premium <span className="italic text-[#c8a96b]">Lighting Solutions</span>
          </h1>
          <p className="text-white/70 text-lg mt-6 max-w-2xl">
            Explore our comprehensive range of professional lighting products designed for every space and application.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-12 py-20">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
            {productCategories.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(product.category)}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative overflow-hidden rounded-lg cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl ${
                  product.span === "large" ? "md:col-span-2 md:row-span-2" : ""
                } ${product.span === "medium" ? "md:col-span-2" : ""}`}
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 1,
                      y: hoveredId === product.id ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-[#d4b16a] text-xs md:text-sm tracking-[0.2em] uppercase mt-3 md:mt-4">
                      {product.subtitle}
                    </p>
                  </motion.div>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-[#c8a96b] text-xs uppercase tracking-[0.15em] font-semibold"
                  >
                    Explore →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-20 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Our expert team is ready to help you find the perfect lighting solution for your project.
          </p>
          <button className="bg-[#c8a96b] text-black px-10 py-4 tracking-[0.2em] uppercase text-sm font-semibold hover:bg-[#d4b16a] transition duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}