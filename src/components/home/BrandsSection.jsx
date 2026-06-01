// import { motion } from "framer-motion";

// const logos = [
//   "/brands/al-othaim.png",
//   "/brands/fitness-first.png",
//   "/brands/fabyland.png",
//   "/brands/emaar.png",
//   "/brands/fun-city.png",
//   "/brands/gemo.png",
//   "/brands/ground-control.png",
//   "/brands/xtreme.png",
//   "/brands/flipped.png",
//   "/brands/funco.png",
//   "/brands/lpme.png",
//   "/brands/adventureland.png",
//   "/brands/jumble.png",
//   "/brands/orangeseeds.png",
//   "/brands/nike.png",
//   "/brands/cheeky-monkeys.png",
//   "/brands/accessories.png",
//   "/brands/columbia.png",
//   "brands/candelite.png",
//   "brands/timberland.png",
//   "brands/ikea.png",
//   "brands/dubai-properties.png",
//   "brands/majid.png",
//   "brands/hugo-boss.png",
//   "brands/damac.png",
//   "brands/good-health.png",
//   "brands/vans.png",
//   "brands/sandro.png",
//   "brands/converse.png",
//   "brands/maisons.png",
//   "brands/sunnsand.png",
//   "brands/temperly.png",
//   "brands/gmg.png",
//   "brands/naramilano.png",
//   "brands/al-futtaim.png",
//   "brands/zadig.png",
// ];

// export default function BrandsSection() {
//   return (
//     <section className="relative bg-black py-28 overflow-hidden">

//       {/* GOLD GLOW */}
//       <div className="absolute inset-0 flex justify-center">
//         <div className="w-[700px] h-[300px] bg-[#c8a96b]/10 blur-[160px]" />
//       </div>

//       <div className="relative z-10">

//         {/* HEADING */}
//         <div className="text-center mb-20 px-6">

//           <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
//             Trusted By
//           </p>

//           <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
//             Brands We
//             <span className="italic text-[#c8a96b]">
//               {" "}Work With
//             </span>
//           </h2>

//         </div>

//         {/* LOGO STRIP */}
//         <div className="relative">

//           {/* LEFT FADE */}
//           <div className="absolute left-0 top-0 w-40 h-full z-20 bg-gradient-to-r from-black to-transparent" />

//           {/* RIGHT FADE */}
//           <div className="absolute right-0 top-0 w-40 h-full z-20 bg-gradient-to-l from-black to-transparent" />

//           {/* GLASS CONTAINER */}
//           <div className="border-y border-white/10 bg-white/[0.03] backdrop-blur-xl py-12 overflow-hidden">

//             <motion.div
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{
//                 duration: 90,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="flex gap-20 min-w-max items-center"
//             >
//               {[...logos, ...logos].map((logo, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-center w-[220px]"
//                 >
//                   <img
//                     src={logo}
//                     alt=""
//                     className="h-20 md:h-24 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500"
//                   />
//                 </div>
//               ))}
//             </motion.div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import PageLink from "../ui/PageLink";

const featuredLogos = [
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
];

export default function BrandsSection() {
  return (
    <section
      id="brands"
      className="relative bg-black py-28 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#c8a96b]/10 blur-[180px]" />
      </div>

      <div className="relative z-10">

        {/* TOP */}
        <div className="text-center px-6">

          <p className="uppercase tracking-[0.45em] text-xs text-[#c8a96b] mb-6">
            Trusted By
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight">
            Brands We
            <span className="italic text-[#c8a96b]">
              {" "}Work With
            </span>
          </h2>

          <p className="mt-8 text-white/50 max-w-2xl mx-auto leading-8">
            Collaborating with globally recognized brands,
            entertainment destinations, retail leaders,
            and architectural innovators across multiple countries.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 px-6">

          {[
            { number: "30+", label: "Global Brands" },
            { number: "7+", label: "Countries" },
            { number: "1000+", label: "Installations" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl text-white font-serif">
                {item.number}
              </h3>

              <p className="text-white/40 uppercase tracking-[0.3em] text-xs mt-3">
                {item.label}
              </p>
            </div>
          ))}

        </div>

        {/* LOGO SECTION */}
        <div className="relative mt-24">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 w-32 md:w-52 h-full z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 w-32 md:w-52 h-full z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          {/* GLASS WRAPPER */}
          <div className="border-y border-white/10 bg-white/[0.03] backdrop-blur-2xl py-14 overflow-hidden">

            <motion.div
              drag="x"
              dragConstraints={{ left: -1200, right: 0 }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-20 md:gap-28 min-w-max px-10 cursor-grab active:cursor-grabbing"
            >
              {[...featuredLogos, ...featuredLogos].map(
                (logo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.08,
                      y: -5,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="flex items-center justify-center w-[180px] md:w-[240px]"
                  >
                    <img
                      src={logo}
                      alt=""
                      draggable="false"
                      className="h-16 md:h-24 object-contain opacity-80 hover:opacity-100 transition duration-500 select-none"
                    />
                  </motion.div>
                )
              )}
            </motion.div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-16">

          {/* <Link
            to="/brands"
            className="group border border-[#c8a96b]/40 text-[#c8a96b] px-10 py-5 uppercase tracking-[0.3em] text-xs hover:bg-[#c8a96b] hover:text-black transition duration-500"
          >
            View All Partners
            <span className="inline-block ml-3 group-hover:translate-x-1 transition duration-300">
              →
            </span>
          </Link> */}
          <PageLink
            to="/brands"
            returnHash="#brands"
            className="group border border-[#c8a96b]/40 text-[#c8a96b] px-10 py-5 uppercase tracking-[0.3em] text-xs hover:bg-[#c8a96b] hover:text-black transition duration-500"
          >
            View All Partners

            <span className="inline-block ml-3 group-hover:translate-x-1 transition duration-300">
              →
            </span>
          </PageLink>

        </div>

      </div>
    </section>
  );
}