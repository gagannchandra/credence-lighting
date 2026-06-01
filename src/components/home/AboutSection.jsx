// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// export default function AboutSection() {
//   return (
//     <section
//   id="about"
//   className="h-screen bg-black text-white flex items-center justify-center px-6 py-24"
// >
//       <div className="max-w-7xl mx-auto text-center">
        
//         {/* HEADING */}
//         <motion.h2
//           initial={{ opacity: 0, y: 80 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-6xl font-serif leading-tight"
//         >
//           Credence: Aesthetics
//         </motion.h2>

//         <motion.h3
//           initial={{ opacity: 0, y: 80 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 1 }}
//           viewport={{ once: true }}
//           className="italic text-[#c8a96b] text-4xl md:text-6xl font-serif mt-2"
//         >
//           meets functionality
//         </motion.h3>

//         {/* DESCRIPTION */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 1 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto mt-10 text-white/75 text-lg leading-9"
//         >
//           At Credence Lighting, we understand the pivotal role that
//           lighting plays in enhancing the ambiance, functionality,
//           and aesthetics of your commercial space. We offer an
//           extensive range of high-quality lighting solutions tailored
//           to meet your unique needs.
//         </motion.p>

//         {/* BUTTONS */}
//         <div className="grid md:grid-cols-2 gap-8 mt-16">
          
//           {/* BUTTON 1 */}
//           <Link to="/products">
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             viewport={{ once: true }}
//             className="group border border-white/10 rounded-[2rem] p-10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition duration-500 cursor-pointer"
//           >
//             <p className="tracking-[0.4em] uppercase text-sm text-white/50">
//               Discover
//             </p>

//             <h4 className="mt-4 text-3xl md:text-4xl font-serif tracking-[0.08em]">
//               Explore Products
//             </h4>
            
//              <p className="mt-3 tracking-[0.08em] text-sm text-white/50 min-h-[24px]">
//   Discover our recent lighting collections
// </p>
//             <div className="mt-2 text-2xl text-white/40 group-hover:translate-x-3 transition duration-500">
//               →
//             </div>
//           </motion.div>
//           </Link>
//           {/* BUTTON 2 */}
//           <Link to="/products">
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             viewport={{ once: true }}
//             className="group border border-[#c8a96b]/30 rounded-[2rem] p-10 bg-[#c8a96b]/[0.04] backdrop-blur-md hover:bg-[#c8a96b]/[0.08] transition duration-500 cursor-pointer"
//           >
//             <p className="tracking-[0.4em] uppercase text-sm text-[#c8a96b]/70">
//               Showcase
//             </p>

//             <h4 className="mt-4 text-3xl md:text-4xl font-serif tracking-[0.08em] text-[#c8a96b]">
//   View Portfolio
// </h4>

// <p className="mt-3 tracking-[0.08em] text-sm text-[#c8a96b]/60 min-h-[24px]">
//   Explore our completed lighting projects
// </p>

// <div className="mt-4 text-2xl text-[#c8a96b]/60 group-hover:translate-x-3 transition duration-500">
//   →
// </div>
//           </motion.div>
//           </Link>
//         </div>

//         {/* STATS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 1 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 border-t border-white/10 pt-12"
//         >
//           {[
//             ["10+", "Years Of Experience"],
//             ["7+", "Countries"],
//             ["30+", "Partner Brands"],
//             ["Thousands", "Global Customers"],
//           ].map(([number, text]) => (
//             <div key={text}>
//               <h5 className="text-3xl md:text-4xl font-serif">
//                 {number}
//               </h5>

//               <p className="mt-3 uppercase tracking-[0.3em] text-xs text-[#c8a96b]">
//                 {text}
//               </p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/scrollUtils";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white flex items-center overflow-hidden px-6 pt-36 pb-20"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-[#c8a96b]/10 blur-[180px]" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
            Credence: Aesthetics
          </h2>

          <h3 className="italic text-[#c8a96b] text-4xl sm:text-5xl md:text-6xl font-serif mt-3 leading-none">
            meets functionality
          </h3>

        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="w-24 h-[1px] bg-[#c8a96b]/40 mx-auto mt-8"
        />

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-8 text-white/60 text-lg leading-9"
        >
          At Credence Lighting, we understand the pivotal role
          that lighting plays in enhancing the ambiance,
          functionality, and aesthetics of your commercial
          spaces. We deliver innovative lighting solutions
          designed to combine performance, elegance, and
          architectural excellence.
        </motion.p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-[1200px] mx-auto">

          {/* PRODUCTS CARD */}
          <motion.button
            type="button"
            onClick={() => scrollToSection("products")}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden border border-white/10 rounded-[2.5rem] p-8 md:p-10 bg-white/[0.03] backdrop-blur-2xl transition duration-500 h-[220px] flex flex-col items-center justify-center w-full cursor-pointer"
          >

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />

              {/* INNER GOLD GLOW */}
              <div className="absolute w-[250px] h-[220px] bg-white/5 blur-[120px] opacity-0 group-hover:opacity-100 transition duration-700" />

              <p className="relative z-10 tracking-[0.45em] uppercase text-xs text-white/40">
                Discover
              </p>

              <h4 className="relative z-10 mt-6 text-3xl md:text-4xl font-serif text-white tracking-[0.05em]">
                Explore Products
              </h4>

              <p className="relative z-10 mt-5 text-sm text-white/45 leading-7">
                Discover our recent lighting collections
              </p>

              <div className="relative z-10 mt-8 text-2xl text-white/40 group-hover:translate-x-2 transition duration-500">
                →
              </div>

          </motion.button>

          {/* PORTFOLIO CARD */}
          <motion.button
            type="button"
            onClick={() => scrollToSection("projects")}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden border border-[#c8a96b]/20 rounded-[2.5rem] p-8 md:p-10 bg-[#c8a96b]/[0.03] backdrop-blur-2xl transition duration-500 h-[220px] flex flex-col items-center justify-center w-full cursor-pointer"
          >

              {/* GOLD HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#c8a96b]/10 via-transparent to-transparent" />

              {/* GOLD AMBIENT */}
              <div className="absolute w-[250px] h-[220px] bg-[#c8a96b]/10 blur-[120px] opacity-0 group-hover:opacity-100 transition duration-700" />

              <p className="relative z-10 tracking-[0.45em] uppercase text-xs text-[#c8a96b]/60">
                Showcase
              </p>

              <h4 className="relative z-10 mt-6 text-3xl md:text-4xl font-serif text-[#c8a96b] tracking-[0.05em]">
                View Portfolio
              </h4>

              <p className="relative z-10 mt-5 text-sm text-[#c8a96b]/55 leading-7">
                Explore our completed lighting projects
              </p>

              <div className="relative z-10 mt-8 text-2xl text-[#c8a96b]/60 group-hover:translate-x-2 transition duration-500">
                →
              </div>

          </motion.button>

        </div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 border-t border-white/10 pt-8"
        >

          {[
            ["10+", "Years Of Experience"],
            ["7+", "Countries"],
            ["30+", "Partner Brands"],
            ["1000+", "Projects Delivered"],
          ].map(([number, text], index) => (

            <div
              key={text}
              className={`text-center ${
                index !== 0
                  ? "md:border-l md:border-white/10"
                  : ""
              }`}
            >

              <h5 className="text-3xl md:text-4xl font-serif text-white">
                {number}
              </h5>

              <p className="mt-4 uppercase tracking-[0.3em] text-xs text-[#c8a96b]/70">
                {text}
              </p>

            </div>

          ))}

        </motion.div>

      </div>
    </section>
  );
}