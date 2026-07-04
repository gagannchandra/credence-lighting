import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/seo/SEO";
import BackButton from "../components/ui/BackButton";
import { motion } from "framer-motion";
import { scrollToTop } from "../utils/scrollUtils";
import PageTransition from "../components/ui/motion/PageTransition";

const brands = [
  "/brands/al-othaim.webp",
  "/brands/fitness-first.webp",
  "/brands/fabyland.webp",
  "/brands/emaar.webp",
  "/brands/fun-city.webp",
  "/brands/gemo.webp",
  "/brands/ground-control.webp",
  "/brands/xtreme.webp",
  "/brands/flipped.webp",
  "/brands/funco.webp",
  "/brands/lpme.webp",
  "/brands/adventureland.webp",
  "/brands/jumble.webp",
  "/brands/orangeseeds.webp",
  "/brands/nike.webp",
  "/brands/cheeky-monkeys.webp",
  "/brands/accessories.webp",
  "/brands/columbia.webp",
  "/brands/candelite.webp",
  "/brands/timberland.webp",
  "/brands/ikea.webp",
  "/brands/dubai-properties.webp",
  "/brands/majid.webp",
  "/brands/hugo-boss.webp",
  "/brands/damac.webp",
  "/brands/good-health.webp",
  "/brands/vans.webp",
  "/brands/sandro.webp",
  "/brands/converse.webp",
  "/brands/maisons.webp",
  "/brands/sunnsand.webp",
  "/brands/temperly.webp",
  "/brands/gmg.webp",
  "/brands/naramilano.webp",
  "/brands/al-futtaim.webp",
  "/brands/zadig.webp",
];

export default function Brands() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <PageTransition>
      <SEO 
        title="Global Brand Partners | Credence Lighting Collaborations" 
        description="Credence Lighting partners with internationally recognized brands, hospitality groups, and architectural innovators across the globe." 
      />
      <Navbar />
      <BackButton />

      <section
        id="brands-page-top"
        className="relative min-h-screen bg-black overflow-hidden pt-40 pb-28"
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#c8a96b]/10 blur-[180px]" />

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12">

          {/* HEADER */}
          <div className="text-center max-w-4xl mx-auto">

            <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
              Trusted Collaborations
            </p>

            <h1 className="text-fluid-h1 font-serif text-white">
              Our Global
              <span className="italic text-[#c8a96b]">
                {" "}Brand Partners
              </span>
            </h1>

            <p className="mt-10 text-white/50 text-lg leading-[1.8]">
              We proudly collaborate with internationally recognized
              brands, entertainment destinations, retail leaders,
              hospitality groups, and architectural innovators across
              multiple countries.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-24">

            {[
              { number: "30+", label: "Partner Brands" },
              { number: "7+", label: "Countries" },
              { number: "1000+", label: "Projects Delivered" },
              { number: "10+", label: "Years Experience" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-[30px] p-10 text-center"
              >
                <h3 className="text-fluid-h2 text-white font-serif">
                  {item.number}
                </h3>

                <p className="mt-4 uppercase tracking-[0.3em] text-xs text-white/40">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 mt-28">

            {brands.map((logo, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.03,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group relative border border-white/10 bg-white/[0.03] backdrop-blur-2xl rounded-[28px] h-[180px] flex items-center justify-center overflow-hidden"
              >
                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#c8a96b]/10 via-transparent to-transparent" />

                {/* LOGO */}
                <img
                  src={logo}
                  alt=""
                  className="relative z-10 h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition duration-500 px-6"
                />
              </motion.div>
            ))}

          </div>

        </div>

      </section>

      <Footer />
    </PageTransition>
  );
}   