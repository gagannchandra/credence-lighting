import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogFeatured({ post }) {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full rounded-3xl overflow-hidden group mb-16 border border-white/10"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full h-[400px] lg:h-auto lg:w-3/5 lg:min-h-[500px]">
          <img
            src={post.heroImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#0a0a0a] lg:via-[#0a0a0a]/50 lg:to-transparent z-10" />
        </div>

        {/* Content Section */}
        <div className="lg:w-2/5 bg-[#0a0a0a] p-8 lg:p-12 flex flex-col justify-center z-20 -mt-20 lg:mt-0 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a96b]/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#c8a96b]/10 text-[#c8a96b] text-xs uppercase tracking-widest border border-[#c8a96b]/20 rounded-full">
              Featured
            </span>
            <span className="text-white/40 text-xs flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-fluid-h2 font-serif text-white/90 mb-4 group-hover:text-[#c8a96b] transition-colors duration-300">
              {post.title}
            </h2>
          </Link>

          <p className="text-white/60 text-base md:text-lg leading-[1.8] mb-8">
            {post.excerpt}
          </p>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-3 text-[#c8a96b] hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase text-xs font-semibold"
          >
            Read Full Story
            <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
