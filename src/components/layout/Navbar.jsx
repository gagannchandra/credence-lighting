import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import PageLink from "../ui/PageLink";
import logo2 from "../../assets/images/logo2.png";
import { scrollToSection } from "../../utils/scrollUtils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showFixedNavbar, setShowFixedNavbar] =
    useState(false);
  const showFixedNavbarRef = useRef(showFixedNavbar);

  const heroButtonRef = useRef(null);
  const topButtonRef = useRef(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    showFixedNavbarRef.current = showFixedNavbar;
  }, [showFixedNavbar]);

  // prevents reopening instantly
  const [allowHoverOpen, setAllowHoverOpen] =
    useState(true);

  // SWITCH NAVBAR STYLE (Home hero vs other pages)
  useEffect(() => {
    let rafId = 0;

    const compute = () => {
      // Non-home pages: fixed navbar always.
      if (!isHomePage) {
        setShowFixedNavbar(true);
        return;
      }

      // Home page: switch once the hero is scrolled away.
      const heroEl = document.getElementById("hero");
      if (!heroEl) {
        setShowFixedNavbar(window.scrollY > 40);
        return;
      }

      const rect = heroEl.getBoundingClientRect();
      // Hysteresis reduces flicker near the boundary.
      const ENTER_THRESHOLD = 90;
      const EXIT_THRESHOLD = 120;

      if (
        !showFixedNavbarRef.current &&
        rect.bottom <= ENTER_THRESHOLD
      ) {
        setShowFixedNavbar(true);
        return;
      }

      if (
        showFixedNavbarRef.current &&
        rect.bottom > EXIT_THRESHOLD
      ) {
        setShowFixedNavbar(false);
      }
    };

    const handleScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(compute);
    };

    handleScrollOrResize();

    window.addEventListener(
      "scroll",
      handleScrollOrResize,
      { passive: true }
    );
    window.addEventListener(
      "resize",
      handleScrollOrResize
    );

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener(
        "scroll",
        handleScrollOrResize
      );
      window.removeEventListener(
        "resize",
        handleScrollOrResize
      );
    };
  }, [isHomePage]);

  // If style changes while menu is open, close it.
  useEffect(() => {
    if (showFixedNavbar && open) setOpen(false);
  }, [showFixedNavbar, open]);

  // HOVER OPEN removed to prevent accidental navbar opening on mouse proximity

  // CLOSE MENU
  const closeMenu = () => {
    setOpen(false);

    // stop instant reopen
    setAllowHoverOpen(false);

    setTimeout(() => {
      setAllowHoverOpen(true);
    }, 1200);
  };

  const navItems = [
    { name: "Home", to: "/#hero" },
    { name: "About", to: "/#about" },
    { name: "Brands", to: "/#brands" },
    { name: "Products", to: "/#products" },
    { name: "Projects", to: "/#projects" },
    { name: "Contact", to: "/#contact" },
  ];

  const desktopNavLinks = navItems;

  return (
    <>
      {/* TOP NAVBAR */}
      <motion.nav
        initial={false}
        animate={{
          y: showFixedNavbar ? 0 : -110,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-0 w-full z-40 ${
          showFixedNavbar
            ? ""
            : "pointer-events-none"
        }`}
      >
        <div className="mx-auto mt-4 w-full max-w-[1600px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl px-4 sm:px-6 py-4 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          {/* Logo + company name */}
          <PageLink
            to="/#hero"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("hero");
              }
            }}
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src={logo2}
              alt="Credence Lighting"
              className="h-8 md:h-10 w-auto object-contain logo-glow"
            />
            <span className="hidden md:inline-flex font-serif text-white tracking-wide text-lg drop-shadow-[0_0_10px_rgba(200,169,107,0.25)]">
              Credence Lighting
            </span>
          </PageLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {desktopNavLinks.map((item) => (
              <PageLink
                key={item.name}
                to={item.to}
                onClick={(e) => {
                  // When already on Home, ensure we scroll to the section.
                  if (isHomePage && item.to.startsWith("/#")) {
                    e.preventDefault();
                    scrollToSection(item.to.slice(2));
                  }
                }}
                className="text-white/80 hover:text-white transition duration-300 text-sm uppercase tracking-[0.08em] touch-glow"
              >
                {item.name}
              </PageLink>
            ))}
          </div>

          {/* Hamburger (mobile/tablet) */}
          <button
            ref={topButtonRef}
            onClick={() => setOpen(true)}
            className="md:hidden text-white touch-glow p-3 rounded-full border border-white/10"
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      {/* HERO SCREEN LOGO */}
      {!showFixedNavbar && (
        <div className="fixed top-4 left-4 z-40">
          <PageLink
            to="/#hero"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("hero");
              }
            }}
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src={logo2}
              alt="Credence Lighting"
              className="h-8 md:h-10 w-auto object-contain logo-glow"
            />
          </PageLink>
        </div>
      )}

      {/* HERO MENU BUTTON */}
      {!showFixedNavbar && (
        <motion.button
          ref={heroButtonRef}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => setOpen(true)}
          className="fixed top-7 right-7 z-50 text-white touch-glow"
        >
          <Menu
            size={34}
            strokeWidth={1.5}
          />
        </motion.button>
      )}

      {/* MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 180,
              }}
              className="fixed top-0 right-0 h-screen w-full md:w-1/2 bg-black/90 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col px-6 sm:px-10 md:px-16 py-7 overflow-y-auto"
            >
              {/* GLOW */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c8a96b]/10 blur-[160px]" />

              {/* CLOSE */}
              <button
                onClick={closeMenu}
                className="absolute top-8 right-8 text-white z-20"
              >
                <X
                  size={34}
                  strokeWidth={1.5}
                />
              </button>

              {/* LINKS */}
              <div className="relative z-10 space-y-4 pt-10 flex-1">

                {navItems.map(
                  (item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{
                        opacity: 0,
                        x: 80,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <PageLink
                        to={item.to}
                        onClick={(e) => {
                          if (isHomePage && item.to.startsWith("/#")) {
                            e.preventDefault();
                            scrollToSection(item.to.slice(2));
                          }
                          closeMenu();
                        }}
                        className="group flex items-center gap-4 text-4xl sm:text-5xl md:text-6xl text-white/90 hover:text-[#c8a96b] transition duration-300 font-serif touch-glow"
                      >
                        {item.name}

                        <ArrowUpRight
                          size={28}
                          className="opacity-0 group-hover:opacity-100 transition duration-300"
                        />
                      </PageLink>
                    </motion.div>
                  )
                )}

                {/* DOWNLOADS */}
               <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="pt-6"
>
                  <PageLink
                    to="/downloads"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-3 border border-[#c8a96b] px-6 py-3 uppercase tracking-[0.25em] text-[10px] text-[#c8a96b] hover:bg-[#c8a96b] hover:text-black transition duration-500"
                  >
                    Downloads

                    <ArrowUpRight
                      size={16}
                    />
                  </PageLink>
                </motion.div>

              </div>

              {/* FOOTER */}
              {/* FOOTER */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
>
  <div className="border-t border-white/10 pt-8">
    
    <p className="text-white/40 tracking-[0.3em] uppercase text-xs">
      Luxury Interior Experience
    </p>

  </div>
</motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}