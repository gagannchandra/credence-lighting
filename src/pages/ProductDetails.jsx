import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import PageLink from "../components/ui/PageLink";

import products from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const currentIndex = products.findIndex((item) => item.id === Number(id));
  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  if (!product) {
    return (
      <div className="h-screen bg-[#f5f2eb] flex items-center justify-center text-black text-3xl font-serif">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="bg-[#050505] min-h-screen relative overflow-hidden text-white">
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#b89b5e] rounded-full blur-[160px] opacity-[0.07]" />
        <div className="absolute top-[70%] right-[5%] w-[40%] h-[40%] bg-[#b89b5e] rounded-full blur-[150px] opacity-[0.07]" />
      </div>
      
      <BackButton />

      <section className="relative pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto min-h-[90vh] flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* LEFT: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 relative z-10 bg-black"
          >
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </motion.div>
          {/* Accent element behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[#c8a96b]/20 rounded-xl z-0 pointer-events-none hidden md:block" />
        </div>

        {/* RIGHT: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="uppercase tracking-[0.4em] text-xs font-semibold text-[#b89b5e] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#b89b5e]"></span>
            {product.category}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-white text-5xl md:text-6xl lg:text-[4.5rem] font-serif leading-[1.1] mb-6 tracking-tight"
          >
            {product.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-white/50 uppercase tracking-[0.25em] text-xs mb-10 font-medium"
          >
            {product.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-white/70 text-base md:text-lg leading-[1.8] font-light mb-12 max-w-[500px]"
          >
            Discover our premium <strong className="font-semibold text-white">{product.title}</strong>, curated specifically for {product.category.toLowerCase()} applications. Engineered for uncompromised performance and aesthetic excellence, it seamlessly integrates into modern luxury spaces.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <PageLink
              to="/"
              returnHash="#contact"
              className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-12 py-4 tracking-[0.2em] uppercase text-xs font-medium hover:bg-[#c8a96b] hover:border-[#c8a96b] hover:text-black transition-all duration-500 shadow-xl rounded-sm group"
            >
              Enquire Now
              <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </PageLink>
          </motion.div>
        </div>
      </section>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-4 z-20">
        {previousProduct && (
          <button
            onClick={() => navigate(`/product/${previousProduct.id}`)}
            className="w-14 h-14 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
            aria-label="Previous product"
          >
            <span className="text-xl leading-none -translate-y-[1px]">←</span>
          </button>
        )}
        {nextProduct && (
          <button
            onClick={() => navigate(`/product/${nextProduct.id}`)}
            className="w-14 h-14 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
            aria-label="Next product"
          >
            <span className="text-xl leading-none -translate-y-[1px]">→</span>
          </button>
        )}
      </div>
    </main>
  );
}