import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import PageLink from "../components/ui/PageLink";
import products from "../data/products";
import { slugify } from "../utils/routeUtils";
import SEO from "../components/seo/SEO";

const categoriesList = [
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

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Backward compatibility: might still get raw name like "LED%20Screen"
  const matchedCategory = categoriesList.find(c => slugify(c) === slug) || decodeURIComponent(slug);
  const categoryProducts = products.filter((item) => item.category === matchedCategory);

  const currentIndex = categoriesList.findIndex(c => c === matchedCategory);
  const previousCategory = currentIndex > 0 ? categoriesList[currentIndex - 1] : null;
  const nextCategory = currentIndex < categoriesList.length - 1 ? categoriesList[currentIndex + 1] : null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // Reset index when changing category
  useEffect(() => {
    setActiveImageIndex(0);
  }, [matchedCategory]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveImageIndex((prev) => (prev === 0 ? categoryProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev === categoryProducts.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0
    })
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, categoryProducts]);

  if (categoryProducts.length === 0) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white text-3xl font-serif">
        <BackButton />
        Collection Not Found
      </div>
    );
  }

  const sampleProduct = categoryProducts[0];

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-x-hidden text-white">
      <SEO 
        title={`${matchedCategory} Lighting Collection | Credence Lighting`}
        description={`Explore our premium ${matchedCategory.toLowerCase()} lighting collection. Discover luxury ${sampleProduct.title.toLowerCase()}s engineered for uncompromised performance and aesthetic excellence.`}
        image={sampleProduct.image}
      />
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#b89b5e] rounded-full blur-[160px] opacity-[0.07]" />
        <div className="absolute top-[70%] right-[5%] w-[40%] h-[40%] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.07]" />
      </div>
      
      <BackButton />

      <section className="relative pt-24 md:pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* LEFT: Single Image Slider */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl h-[50vh] sm:h-[60vh] md:h-[80vh] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 relative z-10 bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) handleNext();
              else if (offset.x > 50) handlePrev();
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={activeImageIndex}
                src={categoryProducts[activeImageIndex].image}
                alt={categoryProducts[activeImageIndex].title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-white/5 pointer-events-none z-10" />
            
            {/* Click zones */}
            <div className="absolute inset-0 z-20 flex cursor-pointer">
               <div className="w-1/2 h-full" onClick={handlePrev} />
               <div className="w-1/2 h-full" onClick={handleNext} />
            </div>

            {/* Indicator dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30 pointer-events-none">
              {categoryProducts.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-6 bg-[#c8a96b]' : 'w-2 bg-white/30'}`} />
              ))}
            </div>
          </motion.div>
          {/* Accent element behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[38rem] h-[53vh] sm:h-[63vh] md:h-[83vh] border border-[#c8a96b]/20 rounded-xl z-0 pointer-events-none hidden md:block" />
        </div>

        {/* RIGHT: Sticky Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="uppercase tracking-[0.4em] text-xs font-semibold text-[#b89b5e] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#b89b5e]"></span>
            {matchedCategory} Collection
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-white text-fluid-h1 font-serif mb-6"
          >
            {sampleProduct.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-white/50 uppercase tracking-[0.25em] text-xs mb-10 font-medium"
          >
            {sampleProduct.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="mb-12 max-w-[500px]"
          >
            <p className={`text-white/70 text-base md:text-lg leading-[1.8] font-light transition-all duration-300 ${!isTextExpanded ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
              {categoryDescriptions[matchedCategory] || `Discover our premium ${sampleProduct.title}, curated specifically for ${matchedCategory.toLowerCase()} applications. Engineered for uncompromised performance and aesthetic excellence, it seamlessly integrates into modern luxury spaces.`}
            </p>
            <button 
              onClick={() => setIsTextExpanded(!isTextExpanded)}
              className="md:hidden mt-3 text-[#c8a96b] text-xs uppercase tracking-wider font-semibold"
            >
              {isTextExpanded ? 'Show Less' : 'Learn More'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <PageLink
              to="/contact"
              className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-12 py-4 tracking-[0.2em] uppercase text-xs font-medium hover:bg-[#c8a96b] hover:border-[#c8a96b] hover:text-black transition-all duration-500 shadow-xl rounded-sm group"
            >
              Enquire Now
              <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </PageLink>
          </motion.div>
        </div>
      </section>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 flex gap-3 md:gap-4 z-40 mix-blend-difference">
        {previousCategory && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate(`/products/${slugify(previousCategory)}`);
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
            aria-label="Previous collection"
          >
            <span className="text-xl leading-none -translate-y-[1px]">←</span>
          </button>
        )}
        {nextCategory && (
          <button
             onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate(`/products/${slugify(nextCategory)}`);
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
            aria-label="Next collection"
          >
            <span className="text-xl leading-none -translate-y-[1px]">→</span>
          </button>
        )}
      </div>
    </main>
  );
}