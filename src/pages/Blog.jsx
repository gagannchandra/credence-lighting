import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import SEO from "../components/seo/SEO";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/ui/motion/PageTransition";
import BlogCard from "../components/blog/BlogCard";
import BlogFeatured from "../components/blog/BlogFeatured";
import { blogPosts } from "../data/blog";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => blogPosts.find(p => p.isFeatured), []);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Exclude featured post from grid if no search query (so it doesn't duplicate)
    if (!searchQuery && featuredPost) {
      filtered = filtered.filter(p => p.id !== featuredPost.id);
    }

    return filtered;
  }, [searchQuery, featuredPost]);

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen">
        <SEO 
        title="Lighting Design Blog · Credence Lighting Dubai" 
        description="Expert insights on architectural lighting, LED technology, and lighting design trends. Guides, tips, and inspiration from Credence Lighting's design team."
        schema={[{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Lighting Design Blog · Credence Lighting Dubai",
          "description": "Expert insights on architectural lighting, LED technology, and lighting design trends.",
          "url": "https://www.credencelighting.com/blog"
        }, {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.credencelighting.com/"
          }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.credencelighting.com/blog"
          }]
        }]}
      />
      
      <Navbar />

      <main className="pt-32 pb-24 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c8a96b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        {/* Header */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 mb-20 text-center flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a96b]/10 border border-[#c8a96b]/20 text-[#c8a96b] text-xs font-semibold tracking-widest uppercase mb-6"
          >
            The Journal
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-fluid-h1 font-serif text-white mb-6 leading-tight"
          >
            Insights & <span className="text-[#c8a96b]">Inspiration</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Expert perspectives on architectural lighting, industry trends, and the transformative power of light.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8a96b]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <div className="relative w-full backdrop-blur-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-full py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-[#c8a96b]/50 focus:bg-white/10 transition-all shadow-2xl"
              />
              <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#c8a96b] transition-colors" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Featured Post (Only show if no search query) */}
        {!searchQuery && featuredPost && (
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <BlogFeatured post={featuredPost} />
          </div>
        )}

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-[#111111] rounded-3xl border border-white/5">
              <h3 className="text-2xl text-white font-serif mb-4">No articles found</h3>
              <p className="text-white/50">Try adjusting your search.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-8 px-6 py-3 bg-[#c8a96b] text-black text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      </div>
    </PageTransition>
  );
}
