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
<div className="grid grid-cols-8 gap-4">

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M10 8l6 4-6 4V8z" />
      <path fillRule="evenodd" d="M20 5.5a3 3 0 0 0-2.12-.88H6.12A3 3 0 0 0 4 5.5 3 3 0 0 0 3.5 8.9v6.2a3 3 0 0 0 .5 2.4 3 3 0 0 0 2.12.88h11.76a3 3 0 0 0 2.12-.88 3 3 0 0 0 .5-2.4V8.9a3 3 0 0 0-.5-2.4z" clipRule="evenodd" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.instagram.com/credencelighting/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16 11.37a4 4 0 1 1-7.99.37 4 4 0 0 1 7.99-.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.5 9.86v-6.98h-2.2V12h2.2V9.8c0-2.17 1.28-3.37 3.24-3.37.94 0 1.92.17 1.92.17v2.12h-1.09c-1.08 0-1.42.67-1.42 1.35V12h2.42l-.39 2.88h-2.03v6.98A10 10 0 0 0 22 12Z" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.76a8.28 8.28 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.26 8.26 0 0 1-2.6.98 4.12 4.12 0 0 0-7 3.75A11.7 11.7 0 0 1 3.16 4.7a4.12 4.12 0 0 0 1.28 5.5 4.07 4.07 0 0 1-1.86-.51v.05a4.12 4.12 0 0 0 3.3 4.04 4.12 4.12 0 0 1-1.85.07 4.12 4.12 0 0 0 3.84 2.86A8.27 8.27 0 0 1 2 19.54 11.67 11.67 0 0 0 8.29 21c7.55 0 11.68-6.25 11.68-11.67 0-.18-.01-.35-.02-.53A8.36 8.36 0 0 0 22 5.76Z" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="https://www.linkedin.com/company/credence-lighting-llc/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 4.98 8.5 2.5 2.5 0 0 0 4.98 3.5Zm.02 5.13H2.5V21h4.98V8.63H5Zm7.64 0h-4.7V21h4.7v-6.34c0-3.4 4.35-3.67 4.35 0V21h4.7v-7.42c0-6.32-6.8-6.08-9.05-2.55V8.63Z" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="/gallery"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  </motion.a>

  <motion.a
    whileHover={{ y: -3 }}
    href="/downloads"
    className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#c8a96b] hover:text-[#c8a96b] transition duration-300"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" />
      <path d="M8 12l4 4 4-4" />
      <path d="M12 8v8" />
    </svg>
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