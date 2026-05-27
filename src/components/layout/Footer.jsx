import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#c8a96b]/10 blur-[140px]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 py-16">

        {/* TOP */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-block mb-6">
              <img
                src={logo2}
                alt="Credence Lighting"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            <h3 className="text-4xl md:text-5xl font-serif leading-tight max-w-xl">
              Illuminating Spaces
              <span className="italic text-[#c8a96b]">
                {" "}With Elegance
              </span>
            </h3>

            <p className="mt-8 text-white/50 leading-8 max-w-xl">
              Premium architectural and commercial lighting
              solutions crafted to elevate atmosphere,
              functionality, and spatial identity.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-8">
              Navigation
            </p>

            <div className="space-y-5 text-white/60">

              <a href="#home" className="block hover:text-white transition duration-300 touch-glow">
                Home
              </a>

              <a href="#about" className="block hover:text-white transition duration-300 touch-glow">
                About
              </a>

              <a href="#products" className="block hover:text-white transition duration-300 touch-glow">
                Products
              </a>

              <a href="/downloads" className="block hover:text-white transition duration-300 touch-glow">
                Downloads
              </a>

              <a href="#projects" className="block hover:text-white transition duration-300 touch-glow">
                Projects
              </a>

              <a href="#contact" className="block hover:text-white transition duration-300 touch-glow">
                Contact
              </a>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <p className="uppercase tracking-[0.3em] text-xs text-[#c8a96b] mb-8">
              Contact
            </p>

            <div className="space-y-5 text-white/60">

              <p>
                Dubai Investment Park,
                <br />
                Dubai, UAE
              </p>

              <p>info@credencelighting.com</p>

              <p>+971 564 965 660</p>

            </div>

          </div>

        </div>

        {/* LOWER SECTION */}
<div className="mt-14 pt-8 border-t border-white/10">

  <div className="flex flex-col md:flex-row items-center justify-between gap-8">

    {/* SOCIALS */}
{/* SOCIALS */}
<div className="flex items-center gap-4">

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.instagram.com/credencelighting/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300 text-sm"
  >
    IG
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.linkedin.com/company/credence-lighting-llc/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300 text-sm"
  >
    IN
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300 text-sm"
  >
    X
  </motion.a>

</div>

    {/* BACK TO TOP */}
<button
  onClick={() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }}
  className="group uppercase tracking-[0.3em] text-[10px] text-white/50 hover:text-[#c8a96b] transition duration-300 flex items-center gap-2"
>
  Back To Top

  <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition duration-300">
    ↗
  </span>
</button>

  </div>

  {/* BOTTOM */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">

    <p className="text-white/25 text-xs">
      © 2026 Credence Lighting LLC. All Rights Reserved.
    </p>

    <p className="uppercase tracking-[0.3em] text-[10px] text-white/15">
      Crafted With Precision
    </p>

  </div>

</div>

      </div>

    </footer>
  );
}