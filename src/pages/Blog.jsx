import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/ui/motion/PageTransition";
import BlogCard from "../components/blog/BlogCard";
import BlogFeatured from "../components/blog/BlogFeatured";
import BlogFilterBar from "../components/blog/BlogFilterBar";
import { blogPosts, blogCategories } from "../data/blog";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = useMemo(() => blogPosts.find(p => p.isFeatured), []);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Exclude featured post from grid if no filters are active (so it doesn't duplicate)
    if (activeCategory === "All" && !searchQuery && featuredPost) {
      filtered = filtered.filter(p => p.id !== featuredPost.id);
    }

    return filtered;
  }, [activeCategory, searchQuery, featuredPost]);

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen">
        <SEO 
        title="Luxury Lighting Design Blog & Insights | Credence Lighting" 
        description="Explore expert insights, architectural lighting trends, and inspiration from Credence Lighting's premium design team."
      />
      
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-fluid-h1 font-serif text-white mb-6"
          >
            Insights & <span className="text-[#c8a96b]">Inspiration</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Expert perspectives on architectural lighting, industry trends, and the transformative power of light.
          </motion.p>
        </div>

        {/* Featured Post (Only show if no filters) */}
        {!searchQuery && activeCategory === "All" && featuredPost && (
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <BlogFeatured post={featuredPost} />
          </div>
        )}

        {/* Sticky Filter Bar */}
        <BlogFilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={blogCategories}
        />

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-[#111111] rounded-3xl border border-white/5">
              <h3 className="text-2xl text-white font-serif mb-4">No articles found</h3>
              <p className="text-white/50">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-8 px-6 py-3 bg-[#c8a96b] text-black text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300"
              >
                Clear Filters
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
