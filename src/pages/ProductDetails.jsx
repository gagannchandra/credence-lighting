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
    <main className="bg-[#f5f2eb] min-h-screen relative overflow-hidden">
      <BackButton />

      <section className="relative pt-32 pb-24 px-6 md:px-12 z-10 max-w-[1500px] mx-auto min-h-[90vh] flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* LEFT: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.35em] text-xs text-[#b89b5e] mb-4"
          >
            {product.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-black text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6"
          >
            {product.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-black/60 uppercase tracking-[0.2em] text-xs md:text-sm mb-10"
          >
            {product.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-black/70 text-base md:text-lg leading-relaxed mb-12 max-w-xl"
          >
            Discover our premium {product.title}, designed specifically for {product.category.toLowerCase()} applications. Engineered for performance and aesthetic excellence, it seamlessly integrates into modern spaces.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PageLink
              to="/"
              returnHash="#contact"
              className="inline-block bg-[#c8a96b] text-black px-10 py-4 tracking-[0.2em] uppercase text-sm font-semibold hover:bg-[#b89b5e] transition duration-300 shadow-xl"
            >
              Enquire Now
            </PageLink>
          </motion.div>
        </div>
      </section>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-4 z-10">
        {previousProduct && (
          <button
            onClick={() => navigate(`/product/${previousProduct.id}`)}
            className="w-12 h-12 rounded-full border border-black/20 text-black flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition-all duration-300 bg-white/50 backdrop-blur-md"
            aria-label="Previous product"
          >
            <span className="text-xl">←</span>
          </button>
        )}
        {nextProduct && (
          <button
            onClick={() => navigate(`/product/${nextProduct.id}`)}
            className="w-12 h-12 rounded-full border border-black/20 text-black flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition-all duration-300 bg-white/50 backdrop-blur-md"
            aria-label="Next product"
          >
            <span className="text-xl">→</span>
          </button>
        )}
      </div>
    </main>
  );
}