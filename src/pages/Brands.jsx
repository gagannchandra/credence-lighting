import { useLayoutEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/ui/BackButton";
import { motion } from "framer-motion";
import { scrollToTop } from "../utils/scrollUtils";

const brands = [
  "/brands/al-othaim.png",
  "/brands/fitness-first.png",
  "/brands/fabyland.png",
  "/brands/emaar.png",
  "/brands/fun-city.png",
  "/brands/gemo.png",
  "/brands/ground-control.png",
  "/brands/xtreme.png",
  "/brands/flipped.png",
  "/brands/funco.png",
  "/brands/lpme.png",
  "/brands/adventureland.png",
  "/brands/jumble.png",
  "/brands/orangeseeds.png",
  "/brands/nike.png",
  "/brands/cheeky-monkeys.png",
  "/brands/accessories.png",
  "/brands/columbia.png",
  "/brands/candelite.png",
  "/brands/timberland.png",
  "/brands/ikea.png",
  "/brands/dubai-properties.png",
  "/brands/majid.png",
  "/brands/hugo-boss.png",
  "/brands/damac.png",
  "/brands/good-health.png",
  "/brands/vans.png",
  "/brands/sandro.png",
  "/brands/converse.png",
  "/brands/maisons.png",
  "/brands/sunnsand.png",
  "/brands/temperly.png",
  "/brands/gmg.png",
  "/brands/naramilano.png",
  "/brands/al-futtaim.png",
  "/brands/zadig.png",
];

export default function Brands() {
  useLayoutEffect(() => {
    scrollToTop(true);
    requestAnimationFrame(() => scrollToTop(true));
  }, []);

  return (
    <>
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

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif text-white leading-tight">
              Our Global
              <span className="italic text-[#c8a96b]">
                {" "}Brand Partners
              </span>
            </h1>

            <p className="mt-10 text-white/50 text-lg leading-8">
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
                <h3 className="text-4xl md:text-5xl text-white font-serif">
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
    </>
  );
}   