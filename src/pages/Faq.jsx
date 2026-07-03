import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FaqAccordionGroup from "../components/faq/FaqAccordionGroup";
import { faqData, faqCategories } from "../data/faq";

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Filter logic
  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    // We don't actually filter by category if we are doing scrollspy,
    // so let's show all categories always unless searching,
    // but the original code filtered. If we filter, scrollspy makes no sense
    // because clicking a category hides all others.
    // So for scrollspy to work, we MUST NOT filter out other categories when one is selected.
    
    // Actually, looking at the code, if activeCategory !== "All", it filters out other categories.
    // If other categories are filtered out, there's nothing to scroll to!
    // So for scrollspy, we need to ALWAYS show all categories, and activeCategory just highlights the menu.
    // Let's remove the category filter logic.

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.question.toLowerCase().includes(q) || 
        f.answer.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchQuery]);

  // Group filtered faqs by category for rendering
  const groupedFaqs = useMemo(() => {
    const groups = {};
    filteredFaqs.forEach(faq => {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFaqs]);

  // Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const scrollToCategory = (category) => {
    setIsManualScrolling(true);
    setActiveCategory(category);
    
    if (category === "All") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const id = `faq-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    
    setTimeout(() => {
      setIsManualScrolling(false);
    }, 1000);
  };

  // Scrollspy logic
  useEffect(() => {
    if (isManualScrolling) return;

    const handleScroll = () => {
      let currentActive = "All";
      
      // If user is at the top of the page
      if (window.scrollY < 300) {
        currentActive = "All";
      } else {
        // Iterate categories in reverse order to find the last one whose top is above the threshold
        for (let i = faqCategories.length - 1; i >= 0; i--) {
          const cat = faqCategories[i];
          const id = `faq-category-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250) {
              currentActive = cat;
              break;
            }
          }
        }
      }

      setActiveCategory(prev => {
        if (prev !== currentActive) {
          const sidebarBtn = document.getElementById(`sidebar-cat-${currentActive === "All" ? "all" : currentActive.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
          const sidebarContainer = document.getElementById('faq-sidebar-container');
          if (sidebarBtn && sidebarContainer) {
            const containerHalf = sidebarContainer.clientHeight / 2;
            const btnHalf = sidebarBtn.clientHeight / 2;
            const scrollPos = sidebarBtn.offsetTop - containerHalf + btnHalf;
            sidebarContainer.scrollTo({ top: scrollPos, behavior: 'smooth' });
          }
        }
        return currentActive;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScrolling]);

  return (
    <div className="bg-[#050505] min-h-screen">
      <SEO 
        title="Frequently Asked Questions | Credence Lighting" 
        description="Find answers to common questions about our lighting services, products, installation, and design consultations."
        schema={faqSchema}
      />
      
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#c8a96b]"
          >
            <MessageSquareText size={28} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            How can we <span className="text-[#c8a96b]">help you?</span>
          </motion.h1>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto mt-10"
          >
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-white/10 rounded-full py-4 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-[#c8a96b]/50 transition-colors shadow-2xl"
            />
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sticky Sidebar Categories */}
          <aside className="lg:w-1/4">
            <div id="faq-sidebar-container" className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar pb-8">
              <h3 className="text-lg font-serif text-white mb-6">Categories</h3>
              <nav className="flex flex-col gap-2 relative">
                <button
                  id="sidebar-cat-all"
                  onClick={() => scrollToCategory("All")}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                    activeCategory === "All" 
                      ? "bg-[#c8a96b] text-black font-medium" 
                      : "bg-transparent text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  All Questions
                </button>
                {faqCategories.map(cat => (
                  <button
                    key={cat}
                    id={`sidebar-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => scrollToCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                      activeCategory === cat 
                        ? "bg-[#c8a96b] text-black font-medium" 
                        : "bg-transparent text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* FAQ Accordions Area */}
          <div className="lg:w-3/4">
            {Object.keys(groupedFaqs).length > 0 ? (
              Object.keys(groupedFaqs).map(category => (
                <FaqAccordionGroup 
                  key={category} 
                  category={category} 
                  faqs={groupedFaqs[category]} 
                />
              ))
            ) : (
              <div className="text-center py-24 bg-[#111111] rounded-3xl border border-white/5">
                <h3 className="text-2xl text-white font-serif mb-4">No results found</h3>
                <p className="text-white/50 mb-8">We couldn't find any FAQs matching your search.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="px-6 py-3 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Still Need Help CTA */}
            <div className="mt-20 p-10 bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#c8a96b]/30 rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a96b]/10 blur-[100px] rounded-full pointer-events-none" />
              <h3 className="text-3xl font-serif text-white mb-4 relative z-10">Still have questions?</h3>
              <p className="text-white/60 mb-8 max-w-lg mx-auto relative z-10">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Link to="/contact" className="px-8 py-3 bg-[#c8a96b] text-black text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300 w-full sm:w-auto">
                  Contact Us
                </Link>
                <a href="mailto:info@credencelighting.com" className="px-8 py-3 border border-white/20 text-white text-sm uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
