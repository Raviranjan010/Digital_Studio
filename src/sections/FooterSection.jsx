import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import MagneticButton from "../components/ui/MagneticButton";

/* ── Data ─────────────────────────────────────────────────────────── */
const socials = [
  { label: "GitHub",    href: "https://github.com/Raviranjan010",          icon: "GH" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/raviranjan77/", icon: "LI" },
  { label: "Instagram", href: "https://instagram.com",                     icon: "IG" },
  { label: "Twitter",   href: "https://twitter.com",                       icon: "TW" },
  { label: "Dribbble",  href: "https://dribbble.com",                      icon: "DR" },
];

const navSections = [
  {
    title: "Navigation",
    links: [
      { label: "Home",    href: "#" },
      { label: "About",   href: "#about" },
      { label: "Work",    href: "#projects" },
      { label: "Skills",  href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "All Projects",   href: "#projects" },
      { label: "Certifications", href: "#certifications" },
      { label: "Experience",     href: "#experience" },
      { label: "Archive",        href: "#archive" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Hire Me",        href: "#contact" },
      { label: "Testimonials",   href: "#testimonials" },
      { label: "Contact Form",   href: "#contact" },
    ],
  },
];

/* ── Scroll progress ring (fixed bottom-right) ────────────────────── */
const ScrollProgressRing = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  return (
    <motion.div
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center cursor-pointer"
      style={{ width: 48, height: 48 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(207,163,85,0.2)" }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 180 }}
    >
      <svg width="48" height="48" viewBox="0 0 56 56" className="absolute">
        <circle
          cx="28" cy="28" r="24"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"
        />
        <motion.circle
          cx="28" cy="28" r="24"
          fill="none" stroke="#cfa355" strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength, rotate: -90, transformOrigin: "center" }}
        />
      </svg>
      <span
        className="font-mono"
        style={{ color: "#cfa355", fontSize: 10, fontWeight: 600 }}
      >
        {percent}%
      </span>
    </motion.div>
  );
};

/* ── Availability badge ───────────────────────────────────────────── */
const AvailabilityBadge = () => (
  <motion.div
    className="flex items-center gap-2 px-4 py-1.5 rounded-full"
    style={{
      border: "1px solid rgba(74, 222, 128, 0.2)",
      background: "rgba(74, 222, 128, 0.04)",
    }}
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: 0.2 }}
  >
    <span className="relative flex" style={{ width: 8, height: 8 }}>
      <span
        className="animate-ping absolute inline-flex rounded-full opacity-75"
        style={{ background: "#4ade80", width: "100%", height: "100%" }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{ background: "#4ade80", width: 8, height: 8 }}
      />
    </span>
    <span
      className="font-mono tracking-widest uppercase"
      style={{ color: "#4ade80", fontSize: 9 }}
    >
      Available for new projects
    </span>
  </motion.div>
);

/* ── Social pill with magnetic + shimmer ──────────────────────────── */
const SocialPill = ({ s, i, hoveredSocial, setHoveredSocial }) => {
  const isHovered = hoveredSocial === i;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <MagneticButton
        as="a"
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
          width: 56,
          height: 56,
          border: `1px solid ${isHovered ? "#cfa355" : "rgba(255,255,255,0.08)"}`,
          background: isHovered ? "rgba(207,163,85,0.08)" : "rgba(255,255,255,0.02)",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        strength={0.4}
        onMouseEnter={() => setHoveredSocial(i)}
        onMouseLeave={() => setHoveredSocial(null)}
      >
        <span
          className="font-black"
          style={{
            color: isHovered ? "#cfa355" : "rgba(255,255,255,0.4)",
            fontSize: 16,
            transition: "color 0.4s ease",
          }}
        >
          {s.icon}
        </span>
      </MagneticButton>
    </motion.div>
  );
};

/* ── Nav column ───────────────────────────────────────────────────── */
const NavColumn = ({ section, delay }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      <p
        className="font-mono tracking-widest uppercase"
        style={{ color: "#cfa355", fontSize: 10, letterSpacing: "0.2em" }}
      >
        {section.title}
      </p>
      <ul className="flex flex-col" style={{ gap: 16 }}>
        {section.links.map((link, i) => (
          <li key={link.label}>
             <MagneticButton
                as="a"
                href={link.href}
                className="relative inline-flex items-center gap-3 py-1 group"
                style={{
                  color: hovered === i ? "#ffffff" : "rgba(255,255,255,0.4)",
                  fontSize: 15,
                  transition: "color 0.3s ease",
                }}
                strength={0.2}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
              <motion.span
                className="inline-block rounded-full"
                style={{ background: "#cfa355", height: 2 }}
                animate={{ width: hovered === i ? 24 : 0, opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {link.label}
              </span>
            </MagneticButton>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

/* ── Parallax grid lines (decorative minimal) ─────────────────────────────── */
const MinimalGrid = () => {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(207,163,85,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(207,163,85,0.4) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    />
  );
};

/* ═════════════════════════════════════════════════════════════════════
   MAIN FOOTER COMPONENT
   ═════════════════════════════════════════════════════════════════════ */
const FooterSection = () => {
  const containerRef = useRef(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  /* Live clock (IST) */
  useEffect(() => {
    const tick = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Scroll-driven transforms (Aggressive Footer Reveal Parallax) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const footerY = useSpring(useTransform(scrollYProgress, [0, 1], [-250, 0]), {
    stiffness: 50,
    damping: 25,
  });

  const dividerScaleX = useSpring(useTransform(scrollYProgress, [0.3, 0.8], [0, 1]), {
    stiffness: 40,
    damping: 20,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Sticks content to bottom
      }}
    >
      <ScrollProgressRing />

      <motion.footer
        id="footer"
        className="relative w-full pt-32 pb-10 px-4 md:px-10 lg:px-20 z-10 box-border"
        style={{ y: footerY }}
      >
        <MinimalGrid />

        {/* Huge Watermark */}
        <div className="absolute top-10 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none">
          <span
            className="font-black text-[15vw] leading-none opacity-[0.015]"
            style={{ color: "#ffffff", letterSpacing: "0.05em" }}
          >
            PORTFOLIO
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
            
          {/* ── Top section: CTA & Newsletter ── */}
          <div className="w-full flex flex-col md:flex-row items-end justify-between gap-12 mb-28 border-b border-white/5 pb-20">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-gold"></span>
                <p className="font-mono text-xs tracking-[0.3em] font-medium text-gold/80 uppercase">
                  Ready to collaborate
                </p>
              </div>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9]"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", Georgia, serif',
                  background: "linear-gradient(135deg, #ffffff, #a3a3a3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's Build <br/>
                <span style={{ 
                  background: "linear-gradient(135deg, #cfa355, #e8c975)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent" 
                }}>Something</span>
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                  <MagneticButton
                    as="a"
                    href="mailto:raviranjan01b@gmail.com"
                    className="group flex items-center justify-center px-10 py-5 rounded-full border border-gold/40 bg-gold/10 text-white font-mono text-xs uppercase tracking-widest overflow-hidden relative"
                    strength={0.3}
                  >
                     <span className="absolute inset-0 w-full h-full -ml-[100%] transition-all duration-500 ease-out bg-gold group-hover:ml-0 group-hover:w-full z-0"></span>
                     <span className="relative z-10 group-hover:text-black transition-colors duration-300 font-bold">Start a Project</span>
                  </MagneticButton>
                  <AvailabilityBadge />
              </div>
            </motion.div>

            <motion.div
               className="w-full md:w-auto md:min-w-[320px]"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <form className="relative flex flex-col group">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">Subscribe to updates</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full bg-transparent border-b border-white/20 py-4 pr-12 text-white font-mono text-sm uppercase tracking-wider outline-none focus:border-gold transition-colors placeholder:text-white/20"
                    />
                    <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-gold transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
            </motion.div>
          </div>

          {/* ── Middle section: Links & Info ── */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 mb-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between"
            >
                <div>
                  <h3 className="text-2xl font-black uppercase text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Ravi Ranjan</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed max-w-[280px]">
                    Crafting immersive digital experiences focused on performance, design, and seamless interactions.
                  </p>
                </div>
                
                <div className="mt-12 md:mt-0">
                  <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Socials</p>
                  <div className="flex flex-wrap gap-4">
                    {socials.map((s, i) => (
                      <SocialPill
                        key={s.label}
                        s={s}
                        i={i}
                        hoveredSocial={hoveredSocial}
                        setHoveredSocial={setHoveredSocial}
                      />
                    ))}
                  </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              {navSections.map((section, i) => (
                <NavColumn key={section.title} section={section} delay={0.1 + i * 0.15} />
              ))}
            </div>

          </div>

           {/* ── Bottom gradient divider ── */}
           <motion.div
              style={{
                scaleX: dividerScaleX,
                height: 1,
                width: "100%",
                background: "linear-gradient(90deg, transparent, #cfa355, transparent)",
                transformOrigin: "center",
                marginBottom: 32
              }}
            />

          {/* ── Bottom bar: Copyright & Time ── */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p
              className="font-mono tracking-wider text-center md:text-left"
              style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()} Ravi Ranjan. All Rights Reserved.
            </motion.p>
            
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
               <div className="flex items-center gap-3">
                  <span className="font-mono tracking-widest uppercase text-white/20 text-[10px]">Local Time</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTime}
                      className="font-mono text-gold text-xs font-bold"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentTime}
                    </motion.span>
                  </AnimatePresence>
                </div>
            </motion.div>
          </div>

        </div>
      </motion.footer>
    </div>
  );
};

export default FooterSection;
