import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

export default function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c8a96b]/30 transition-colors duration-500"
    >
      <Link to={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
        <img
          src={post.heroImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
          <span className="text-[10px] uppercase tracking-wider text-[#c8a96b] font-medium">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl md:text-2xl font-serif text-white/90 mb-3 group-hover:text-[#c8a96b] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <Link 
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-[#c8a96b] transition-colors duration-300 uppercase tracking-widest"
        >
          Read Article
          <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}
