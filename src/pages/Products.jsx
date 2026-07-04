import { useLayoutEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import products from "../data/products";
import CategoryCarousel from "../components/gallery/CategoryCarousel";
import { scrollToTop } from "../utils/scrollUtils";
import SEO from "../components/seo/SEO";

const categoryDescriptions = {
  "Indoor": "Sophisticated indoor luminaires designed to enhance interior spaces with optimal light distribution and elegant form factors. Whether for high-end residential living spaces or premium corporate offices, our indoor fixtures blend seamlessly into any decor while providing exceptional energy efficiency and visual comfort.",
  "Outdoor": "Durable and weather-resistant outdoor fixtures that provide exceptional illumination, security, and aesthetic appeal for exterior environments. Engineered to withstand the harshest elements, our outdoor range ensures that landscapes, pathways, and building exteriors remain beautifully lit and safe year-round.",
  "Hospitality": "Luxurious lighting solutions crafted specifically for hotels, restaurants, and resorts to create warm, inviting, and highly premium atmospheres. From statement chandeliers to subtle ambient wall sconces, our hospitality fixtures are designed to leave a lasting impression on your guests and elevate the overall brand experience.",
  "Facade": "High-performance architectural facade lighting that highlights building structures, defines city skylines, and creates stunning nocturnal landmarks. Using advanced optics and precision controls, we illuminate exteriors to showcase architectural details while minimizing light pollution and maximizing energy efficiency.",
  "Entertainment": "Dynamic and vibrant entertainment lighting systems perfect for high-energy clubs, concert stages, and immersive live venues. Featuring rapid movement, vivid color mixing, and robust synchronization capabilities, these fixtures are built to deliver unforgettable visual spectacles night after night.",
  "LED Screen": "High-resolution LED displays offering brilliant colors, deep contrasts, and seamless integration for impactful visual communication. Whether used as dynamic digital signage or massive stage backdrops, our LED screens deliver flawless, bezel-free imagery that commands attention in any environment.",
  "Strech Ceiling": "Elegant stretch ceiling lighting solutions providing uniform, glare-free, and perfectly diffused illumination for modern architectural designs. This innovative lighting approach transforms ordinary ceilings into luminous, seamless surfaces that create a sense of infinite space and refined luxury.",
  "Automation": "Smart lighting control systems for seamless automation, advanced energy efficiency, and deeply personalized lighting experiences. Our intuitive automation interfaces allow you to easily manage complex lighting scenes, schedule automated transitions, and integrate with wider building management ecosystems.",
  "Retail": "Precision retail lighting designed to highlight high-value merchandise, intuitively guide customer flow, and elevate the premium shopping experience. With industry-leading color rendering and flexible track systems, our retail fixtures ensure that every product is presented in its best possible light.",
  "Audio": "Premium audio systems delivering crystal-clear sound quality, deep resonance, and reliable performance for commercial, hospitality, and residential applications. Expertly engineered to complement our visual solutions, these audio systems provide a truly immersive, multi-sensory experience for any high-end space."
};

import PageTransition from "../components/ui/motion/PageTransition";

export default function Products() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <PageTransition>
      <SEO title="Products | Credence Lighting" description="Explore our catalog of premium lighting products and fixtures." />
      <Navbar />

      <div className="relative min-h-screen bg-black overflow-hidden pt-32 pb-10">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#c8a96b]/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12 mb-10">
          <div className="text-center max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
              Premium Collection
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif text-white leading-tight">
              Our Product
              <span className="italic text-[#c8a96b]"> Range</span>
            </h1>
            <p className="mt-10 text-white/50 text-lg leading-8">
              Discover our curated selection of high-end lighting products and solutions designed for exceptional performance, durability, and stunning aesthetics. Whether you are looking for intelligent automation systems, dynamic LED screens, or elegant indoor fixtures, our extensive range ensures that every detail of your project is illuminated to perfection.
            </p>
          </div>
        </div>

        <div className="max-w-[1700px] mx-auto px-6 md:px-12 mt-20 relative z-10">
          {Array.from(new Set(products.map(p => p.category))).map((category) => {
            const categoryProducts = products.filter(p => p.category === category);
            return (
              <div key={category} className="mb-32 last:mb-10">
                <div className="mb-8 md:mb-12">
                  <div className="border-b border-white/10 pb-4 md:pb-6 mb-4 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-8 md:w-12 h-[1px] bg-[#c8a96b]" />
                      <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">{category}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link 
                        to={`/collection/${encodeURIComponent(category)}`}
                        onClick={() => scrollToTop()}
                        className="shrink-0 hidden md:inline-flex border border-white/20 backdrop-blur-sm text-white px-8 py-3 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full items-center justify-center hover:bg-white hover:text-black"
                      >
                        View Collection
                      </Link>
                      <Link 
                        to="/contact"
                        onClick={() => scrollToTop()}
                        className="shrink-0 hidden md:inline-flex border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-8 py-3 tracking-[0.2em] uppercase text-xs transition-all duration-500 rounded-full items-center justify-center gap-3 group hover:bg-[#c8a96b] hover:text-black"
                      >
                        Enquire Now
                        <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                  {categoryDescriptions[category] && (
                    <div className="w-full pr-0 md:pr-8 pl-0 md:pl-[72px] mt-4 md:mt-0">
                      <p className={`text-white/70 text-sm md:text-lg leading-relaxed font-light text-justify transition-all duration-300 ${!expandedCategories[category] ? 'line-clamp-2 md:line-clamp-none' : ''}`}>
                        {categoryDescriptions[category]}
                      </p>
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="md:hidden mt-3 text-[#c8a96b] text-xs uppercase tracking-wider font-semibold"
                      >
                        {expandedCategories[category] ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>
                  )}
                </div>
                
                <CategoryCarousel items={categoryProducts} isProduct={true} />
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:hidden w-full gap-4">
                  <Link 
                    to={`/collection/${encodeURIComponent(category)}`}
                    onClick={() => scrollToTop()}
                    className="w-full inline-flex border border-white/20 backdrop-blur-sm text-white px-6 py-3 tracking-[0.2em] uppercase text-[10px] sm:text-xs transition-all duration-500 rounded-full items-center justify-center hover:bg-white hover:text-black"
                  >
                    View Collection
                  </Link>
                  <Link 
                    to="/contact"
                    onClick={() => scrollToTop()}
                    className="w-full inline-flex border border-[#c8a96b]/40 backdrop-blur-sm text-[#c8a96b] px-6 py-3 tracking-[0.2em] uppercase text-[10px] sm:text-xs transition-all duration-500 rounded-full items-center justify-center gap-3 group hover:bg-[#c8a96b] hover:text-black"
                  >
                    Enquire Now
                    <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </PageTransition>
  );
}
