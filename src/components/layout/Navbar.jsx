import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import PageLink from "../ui/PageLink";
import Magnetic from "../ui/Magnetic";
import MegaMenu from "./MegaMenu";
import logo2 from "../../assets/images/logo2.webp";
import indoorImg from "../../assets/images/indoor/1.webp"; // Using an existing image
import solutionsImg from "../../assets/images/hospitality/1.webp";
import resourcesImg from "../../assets/images/blog/funtura.webp";
import companyImg from "../../assets/images/facade/1.webp";
import projectsImg from "../../assets/images/xtremezone/136.webp";

const navItems = [
  {
    name: "Products",
    to: "/products",
    dropdown: [
      { name: "Indoor Lighting", to: "/products/indoor" },
      { name: "Outdoor Lighting", to: "/products/outdoor" },
      { name: "Decorative Lighting", to: "/products/decorative" },
      { name: "Architectural Lighting", to: "/products/architectural" },
      { name: "Smart Lighting", to: "/products/automation" },
      { name: "Browse All Products", to: "/products" },
    ],
    featured: {
      title: "Indoor Collection",
      image: indoorImg, // We should ensure this path exists or use a robust fallback
    }
  },
  {
    name: "Solutions",
    to: "/solutions",
    dropdown: [
      { name: "Hospitality", to: "/hotel-lighting" },
      { name: "Residential", to: "/residential-lighting" },
      { name: "Commercial", to: "/lighting-company-dubai" },
      { name: "Retail", to: "/retail-lighting" },
      { name: "Entertainment", to: "/entertainment-lighting" },
      { name: "Office", to: "/office-lighting" },
    ],
    featured: {
      title: "Lighting Solutions",
      image: solutionsImg,
    }
  },
  {
    name: "Projects",
    to: "/projects",
    dropdown: [
      { name: "My Town", to: "/projects/my-town" },
      { name: "Ground Control", to: "/projects/ground-control" },
      { name: "Funtura", to: "/projects/funtura" },
      { name: "Xtreme Zone", to: "/projects/xtreme-zone" },
      { name: "Smarvy Spot", to: "/projects/smarvy-spot" },
      { name: "Browse All Projects", to: "/projects" },
    ],
    featured: {
      title: "Featured Projects",
      image: projectsImg,
    }
  },
  {
    name: "Resources",
    to: "/blog",
    dropdown: [
      { name: "Blog", to: "/blog" },
      { name: "Guides", to: "/faq" }, // Using FAQ for guides temporarily
      { name: "Downloads", to: "/downloads" },
      { name: "FAQs", to: "/faq" },
    ],
    featured: {
      title: "Latest Insights",
      image: resourcesImg,
    }
  },
  {
    name: "About Us",
    to: "/about",
    dropdown: [
      { name: "About", to: "/about" },
      { name: "Clients", to: "/brands" },
      { name: "Gallery", to: "/gallery" },
      { name: "Contact", to: "/contact" },
    ],
    featured: {
      title: "Our Heritage",
      image: companyImg,
    }
  }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* PERSISTENT DESKTOP & MOBILE NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40">
        {/* Subtle gradient at the top for legibility without a box */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none h-32 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`} />
        
        <div className={`mx-auto transition-all duration-500 flex items-center justify-between relative z-10 ${
          scrolled 
            ? "mt-4 w-[96%] md:w-[92%] rounded-panel bg-surface-glass backdrop-blur-heavy border border-border-subtle shadow-elevation-high px-6 py-4"
            : "mt-0 w-full rounded-none bg-transparent border-transparent shadow-none px-6 md:px-12 py-6 md:py-8"
        }`}>
          
          {/* Logo */}
          <div className="flex-1 flex justify-start items-center">
            <PageLink
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="relative flex items-center justify-center">
                {/* Sunburst/Glow Effect Background */}
                <div className="absolute inset-0 bg-[#c8a96b]/30 blur-xl rounded-full scale-[1.5] group-hover:scale-[2] group-hover:bg-[#c8a96b]/40 transition-all duration-700 pointer-events-none"></div>
                
                <img
                  src={logo2}
                  alt="Credence Lighting"
                  className="relative z-10 h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(200,169,107,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(200,169,107,1)] transition-all duration-500"
                />
              </div>
              <span className="hidden lg:inline-flex font-serif text-white tracking-wide text-lg group-hover:text-[#c8a96b] transition-colors duration-500">
                Credence Lighting
              </span>
            </PageLink>
          </div>

          {/* Desktop Mega Menu */}
          <div className="hidden lg:flex items-center justify-center gap-10 h-full">
            {navItems.map((item) => (
              <MegaMenu 
                key={item.name} 
                item={item} 
                active={activeMenu} 
                setActive={setActiveMenu} 
              />
            ))}
          </div>

          {/* Right Side: Desktop CTA & Mobile Hamburger */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop CTA */}
            <div className="hidden lg:flex shrink-0">
              <PageLink
                to="/contact"
                className="text-xs uppercase tracking-[0.15em] text-white/90 hover:text-white border border-white/20 hover:border-white transition-all px-6 py-2.5 rounded-button"
              >
                Enquire
              </PageLink>
            </div>

            {/* Mobile Hamburger */}
            <button
              aria-label="Open Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden text-white flex items-center justify-center p-2"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-transparent/60 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
        {open && (
          <motion.div
            key="menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 180,
            }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-surface-elevated border-l border-border-subtle z-50 flex flex-col px-10 py-7 overflow-y-auto lg:hidden"
          >
            {/* CLOSE */}
            <button
              aria-label="Close Menu"
              onClick={closeMenu}
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-20"
            >
              <X size={34} strokeWidth={1.5} />
            </button>

            {/* LINKS */}
            <div className="relative z-10 space-y-6 pt-16 flex-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col gap-3"
                >
                  <PageLink
                    to={item.to}
                    onClick={closeMenu}
                    className="text-3xl text-white font-serif"
                  >
                    {item.name}
                  </PageLink>
                  {item.dropdown && (
                    <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
                      {item.dropdown.map((sub) => (
                        <PageLink
                          key={sub.name}
                          to={sub.to}
                          onClick={closeMenu}
                          className="text-sm text-white/50 hover:text-white transition-colors tracking-wide"
                        >
                          {sub.name}
                        </PageLink>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <PageLink
                  to="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center w-full gap-3 bg-white text-black px-6 py-4 uppercase tracking-[0.15em] text-xs font-semibold"
                >
                  Enquire Now
                  <ArrowUpRight size={16} />
                </PageLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
