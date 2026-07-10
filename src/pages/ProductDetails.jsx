import { useState, useEffect, useCallback } from "react";
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

  const [prevMatchedCategory, setPrevMatchedCategory] = useState(matchedCategory);
  if (matchedCategory !== prevMatchedCategory) {
    setPrevMatchedCategory(matchedCategory);
    setActiveImageIndex(0);
  }

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveImageIndex((prev) => (prev === 0 ? categoryProducts.length - 1 : prev - 1));
  }, [categoryProducts.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev === categoryProducts.length - 1 ? 0 : prev + 1));
  }, [categoryProducts.length]);

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
  }, [isHovered, handlePrev, handleNext]);

  if (categoryProducts.length === 0) {
    return (
      <div className="h-screen bg-transparent flex flex-col items-center justify-center text-white text-3xl font-serif">
        <BackButton />
        Collection Not Found
      </div>
    );
  }

  const sampleProduct = categoryProducts[0];

  return (
    <main className="bg-transparent min-h-screen relative overflow-x-hidden text-white">
      <SEO 
        title={`${matchedCategory} Lighting Collection · Credence Lighting`}
        description={`Explore our premium ${matchedCategory.toLowerCase()} lighting collection. Discover luxury ${sampleProduct.title.toLowerCase()}s engineered for uncompromised performance and aesthetic excellence.`}
        image={sampleProduct.image}
        schema={[{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": sampleProduct.title,
          "image": sampleProduct.image,
          "description": categoryDescriptions[matchedCategory] || sampleProduct.subtitle,
          "brand": {
            "@type": "Brand",
            "name": "Credence Lighting"
          },
          "category": matchedCategory
        }]}
      />
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-gold rounded-button blur-[160px] opacity-[0.07]" />
        <div className="absolute top-[70%] right-[5%] w-[40%] h-[40%] bg-brand-gold rounded-button blur-[150px] opacity-[0.07]" />
      </div>
      
      <BackButton />

      <section className="relative pt-24 md:pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto flex flex-col md:flex-row items-start gap-12 lg:gap-24">
        {/* LEFT: Scrollable Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-12 relative z-10">
          {categoryProducts.map((prod, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 50px 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden rounded-card border border-border-subtle bg-surface-elevated relative group"
            >
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <p className="text-white/80 text-sm font-medium drop-shadow-md">{prod.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Sticky Details */}
        <div className="w-full md:w-1/2 flex flex-col relative z-10 md:sticky md:top-32 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="uppercase tracking-[0.4em] text-xs font-semibold text-brand-gold mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-brand-gold"></span>
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
              className="md:hidden mt-3 text-brand-gold text-xs uppercase tracking-wider font-semibold"
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
              className="inline-flex items-center justify-center bg-white/5 border border-border-subtle text-white px-12 py-4 tracking-[0.2em] uppercase text-xs font-medium hover:bg-white hover:border-white hover:text-black transition-all duration-500 rounded-sm group"
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
            className="w-12 h-12 md:w-14 md:h-14 rounded-button border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
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
            className="w-12 h-12 md:w-14 md:h-14 rounded-button border-2 border-white/40 text-white flex items-center justify-center hover:border-white hover:text-black hover:bg-white transition-all duration-300"
            aria-label="Next collection"
          >
            <span className="text-xl leading-none -translate-y-[1px]">→</span>
          </button>
        )}
      </div>
    </main>
  );
}