import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence
} from "framer-motion";

const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionPath = motion.path;
const MotionSpan = motion.span;

const disciplines = [
  {
    icon: "M5 17.5 14 4l5 13.5M9 10.5H3.5L8 6m7 4.5h5.5L16 6",
    title: "Development",
    body: "Clean front-end systems with sharp structure, readable components, and performance-aware interactions.",
    meta: "JavaScript, React, APIs",
  },
  {
    icon: "M4 8.5 12 4l8 4.5-8 4.5L4 8.5Zm0 5 8 4.5 8-4.5M4 18.5l8 4.5 8-4.5",
    title: "Design",
    body: "Interface direction built around hierarchy, spacing, restraint, and polished product-like presentation.",
    meta: "UI/UX, Apps, Web",
  },
  {
    icon: "M4 6.5h16v11H4v-11Zm4 0v11m8-11v11m-5-7 4 2.5-4 2.5v-5Z",
    title: "Video Editing",
    body: "Editing and motion sensibility that helps digital products feel cinematic without losing usability.",
    meta: "Premiere Pro, After Effects, DaVinci Resolve",
  },
];

const statsData = {
  Dev: [
    { value: "02", label: "Years JS" },
    { value: "+20", label: "Repositories" },
    { value: "01", label: "Framework" },
  ],
  Design: [
    { value: "04", label: "UI Kits" },
    { value: "+10", label: "Prototypes" },
    { value: "99", label: "Layers" },
  ],
  Editor: [
    { value: "03", label: "Timelines" },
    { value: "4K", label: "Resolutions" },
    { value: "24", label: "FPS" },
  ]
};

const codeLinesData = {
  Dev: [
    '{ "name": "Ravi Ranjan",',
    '  "role": "Frontend Developer",',
    '  "focus": "Performant Systems",',
    '  "stack": ["JavaScript", "React"],',
    '  "status": "Compiling..." }',
  ],
  Design: [
    '{ "name": "Ravi Ranjan",',
    '  "role": "UI/UX Designer",',
    '  "focus": "Aesthetics & Flow",',
    '  "tool": "Figma",',
    '  "status": "Aligning to grid..." }',
  ],
  Editor: [
    '{ "name": "Ravi Ranjan",',
    '  "role": "Motion & Video",',
    '  "focus": "Cinematic Cuts",',
    '  "tool": "Premiere Pro",',
    '  "status": "Rendering..." }',
  ]
};

const springConfig = { stiffness: 170, damping: 24, mass: 0.7 };

// 1. Audio Synthesis for Low-Latency UI Sounds
const playSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "pop") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    // silently fail
  }
};

// 2. Magnetic Button Wrapper
const MagneticButton = ({ children, onClick, active }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const springX = useSpring(position.x, { stiffness: 200, damping: 10, mass: 0.5 });
  const springY = useSpring(position.y, { stiffness: 200, damping: 10, mass: 0.5 });

  const handlePointerMove = (e) => {
    if(!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.3); 
    position.y.set(middleY * 0.3);
  };

  const handlePointerLeave = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => {
         playSound("click");
         onClick();
      }}
      animate={{ x: springX, y: springY }}
      whileTap={{ scale: 0.92 }}
      className={`relative z-20 rounded-md border px-4 py-2 text-xs font-black uppercase tracking-[0.22em] transition-colors duration-300 ${
        active
          ? "border-[#b59765] bg-[#6f5b3d] text-[#f8ecd9]"
          : "border-[#4f473d] bg-[#1b1b19] text-[#9d968a] hover:border-[#a5885b] hover:text-[#e0c390]"
      }`}
    >
      {children}
    </motion.button>
  );
};

const MagneticCard = ({ children, className, as = "article", draggable = false }) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-4, 4]), springConfig);
  const Component = as === "div" ? MotionDiv : MotionArticle;

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <Component
      drag={draggable}
      dragElastic={0.16}
      dragMomentum={false}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </Component>
  );
};

// 3. Liquid Morphing Blob Component
const LiquidBlob = ({ activeTab }) => {
  const variants = {
    Dev: {
      borderRadius: ["10%", "10%", "10%"],
      rotate: [0, 90],
      scale: 1,
      backgroundColor: "rgba(181,151,101,0.08)"
    },
    Design: {
      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      rotate: [90, 180, 270],
      scale: 1.1,
      backgroundColor: "rgba(224,195,144,0.06)"
    },
    Editor: {
      borderRadius: ["50%", "50%", "50%"],
      rotate: [0, -90],
      scale: 0.9,
      backgroundColor: "rgba(111,91,61,0.12)"
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={activeTab}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 mix-blend-screen blur-3xl"
    />
  );
};

// 4. Skeleton to Terminal Reveal
const TerminalReveal = ({ activeTab }) => {
  const terminalRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true, amount: 0.3 });
  const terminalText = useMemo(() => codeLinesData[activeTab].join("\n"), [activeTab]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setVisibleCount(0);
    setShowSkeleton(true);
  }, [activeTab]);

  useEffect(() => {
    if (!isInView) return undefined;
    
    // Artificial delay to show skeleton shimmering before shatter
    const shatterTimer = window.setTimeout(() => {
      playSound("pop");
      setShowSkeleton(false);

      const typeTimer = window.setInterval(() => {
        setVisibleCount((count) => {
          if (count >= terminalText.length) {
            window.clearInterval(typeTimer);
            return count;
          }
          return count + 1;
        });
      }, 18);
      return () => window.clearInterval(typeTimer);
    }, 800);

    return () => window.clearTimeout(shatterTimer);
  }, [isInView, activeTab, terminalText.length]);

  return (
    <div ref={terminalRef} className="relative min-h-[16rem]">
      <AnimatePresence mode="wait">
        {showSkeleton ? (
          <motion.div 
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: "blur(10px)",
              transition: { duration: 0.4, ease: "easeOut" } 
            }}
            className="absolute inset-0 flex flex-col gap-3 px-6 py-5"
          >
             {[60, 80, 70, 90, 50].map((width, i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                  className="h-4 rounded bg-[#3a352c]" 
                  style={{ width: `${width}%` }} 
                />
             ))}
          </motion.div>
        ) : (
          <motion.pre
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre-wrap px-6 py-5 font-mono text-[0.95rem] leading-8 text-[#ead8b7] sm:text-lg"
          >
            {terminalText.slice(0, visibleCount)}
            <MotionSpan
              className="ml-1 inline-block text-[#f2dfb8]"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              |
            </MotionSpan>
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
};

// 5. Glassmorphic Shard
const GlassShard = ({ children, top, left, parallaxRef, speed }) => {
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  return (
    <motion.div
      style={{ top, left, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute z-20 flex items-center justify-center p-3 rounded-2xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-[12px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] pointer-events-none"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-60" />
      {children}
    </motion.div>
  );
};

// 6. Stop Motion Image Carousel
const StopMotionImage = () => {
  const images = ["/photos/ravi1.jpg", "/photos/ravi2.png", "/photos/ravi3.png", "/photos/ravi4.png"];
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hovered) {
      setIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 150);
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <div 
      className="aspect-[4/5] w-full relative group/sm overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Ravi Ranjan ${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 rounded-lg border border-[#6a6154] grayscale group-hover/sm:grayscale-0 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        />
      ))}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Dev");
  const stats = statsData[activeTab];
  
  // Mouse parallax setup
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const parallaxX = useSpring(useTransform(cursorX, [-1, 1], [18, -18]), springConfig);
  const parallaxY = useSpring(useTransform(cursorY, [-1, 1], [12, -12]), springConfig);
  const nearParallaxX = useSpring(useTransform(cursorX, [-1, 1], [-30, 30]), springConfig);
  const nearParallaxY = useSpring(useTransform(cursorY, [-1, 1], [-18, 18]), springConfig);
  const spotlightX = useSpring(useTransform(cursorX, [-1, 1], ["8%", "92%"]), springConfig);
  const spotlightY = useSpring(useTransform(cursorY, [-1, 1], ["10%", "90%"]), springConfig);

  // Scrollytelling Setup
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
  const scrollLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    cursorY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetPointer = () => {
    cursorX.set(0);
    cursorY.set(0);
  };a

  return (
    <section
      ref={sectionRef}
      id="about"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="group/about relative bg-[#080807] px-5 py-24 text-[#eee6d8] sm:px-8 lg:px-12"
    >
      {/* Dynamic Scrollytelling Progress Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-[#2a251e] hidden lg:block z-0">
         <motion.div style={{ height: scrollLineHeight }} className="w-full bg-gradient-to-b from-[#a5885b] to-transparent" />
      </div>

      <LiquidBlob activeTab={activeTab} />

      <MotionDiv
        className="pointer-events-none absolute z-20 hidden h-8 w-8 rounded-full border border-[#d8c49e] opacity-0 mix-blend-difference transition-opacity duration-300 group-hover/about:opacity-80 lg:block"
        style={{ left: spotlightX, top: spotlightY, x: "-50%", y: "-50%" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
        backgroundImage:
          "linear-gradient(to right, rgba(231,211,177,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,211,177,0.5) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      <div className="relative z-10 mx-auto max-w-[1460px]">
        {/* Header area */}
        <div className="relative z-30 mb-10 flex items-center gap-5 w-fit pr-4">
          <span className="h-px w-16 bg-[#8d7654]" />
          <p className="text-xs font-semibold uppercase tracking-[0.48em] text-[#9c9589]">
            Who I Am
          </p>
          <span className="h-px w-24 bg-[#3b352c]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(500px,0.92fr)] lg:items-start relative">
          
          {/* Glass shards scattered around text */}
          <GlassShard top="0%" left="80%" parallaxRef={sectionRef} speed={1.5}>
              <span className="text-xs text-[#a5885b] font-mono">&lt;Ravi /&gt;</span>
          </GlassShard>
          <GlassShard top="20%" left="-5%" parallaxRef={sectionRef} speed={0.8}>
              <svg className="w-5 h-5 text-[#a5885b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </GlassShard>

          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Expressive Typography Hook via inline CSS var manipulation or simple hover block */}
              <h2 className="transition-all duration-300 hover:font-[900] hover:tracking-[0.02em] font-[var(--font-amiamie-round)] text-[clamp(3.6rem,8vw,8.8rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#e7d3b1]">
                About Me
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-9 text-[#ded6ca] transition-colors duration-300 group-hover/about:text-[#efe5d7] md:text-2xl md:leading-[1.65]">
                I design and build digital systems where logic meets experience.
                Every interface I create is structured, intentional, and built for 
                <span className="font-bold text-[#f4eadb] transition-all duration-500 hover:tracking-widest"> PERFORMANCE</span>.
              </p>
            </MotionDiv>

            <MagneticCard
              as="div"
              className="mt-10 max-w-3xl cursor-default overflow-hidden rounded-[1.35rem] border border-[#5d5346] bg-[#151513] shadow-[0_26px_70px_rgba(0,0,0,0.42)] transition-colors duration-300 hover:border-[#a5885b]"
            >
              <div className="flex items-center gap-5 border-b border-[#4b443a] px-6 py-5 sm:px-7">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#a5885b] bg-[#d7bd8a] text-[#11100e]">
                  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-[#f4eadb] md:text-3xl">
                    Ravi Ranjan
                  </h3>
                  <p className="mt-1 text-base text-[#d1c6b4] md:text-lg">
                    Developer - Designer - Video Editor
                  </p>
                </div>
              </div>

              <div className="grid divide-y divide-[#403a32] p-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <AnimatePresence mode="popLayout">
                  {stats.map((item, i) => (
                    <motion.div 
                      key={item.label} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-4 py-4 text-center"
                    >
                      <span className="font-[var(--font-amiamie-round)] text-4xl font-black tracking-[-0.06em] text-[#e0c390]">
                        {item.value}
                      </span>
                      <span className="ml-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#a79c8d]">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </MagneticCard>
          </div>

          <MagneticCard
            as="div"
            draggable
            className="relative cursor-grab rounded-[1.7rem] border border-[#6d6253] bg-[#121211] shadow-[0_32px_90px_rgba(0,0,0,0.5)] transition-colors duration-300 active:cursor-grabbing hover:border-[#a5885b]"
          >
            <div className="flex items-center justify-between border-b border-[#51493f] px-5 py-4">
              <div className="flex gap-2">
                {["Dev", "Design", "Editor"].map((item) => (
                   <MagneticButton key={item} active={activeTab === item} onClick={() => setActiveTab(item)}>
                      {item}
                   </MagneticButton>
                ))}
              </div>
              <div className="hidden gap-2 sm:flex">
                <span className="rounded-md border border-[#4f473d] px-3 py-2 text-[#9d968a]">...</span>
                <span className="rounded-md border border-[#4f473d] px-3 py-2 text-[#9d968a]">DRAG</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 relative">
              <div className="overflow-hidden rounded-[1.25rem] border border-[#4b443a] bg-[#191917]">
                <div className="grid gap-0 lg:grid-cols-[170px_minmax(0,1fr)]">
                  <div className="border-b border-[#3f3931] p-4 lg:border-b-0 lg:border-r overflow-hidden group/img">
                    <StopMotionImage />
                    
                    <div className="mt-4 rounded-lg border border-[#37322b] bg-[#141412] p-4">
                      <span className="mb-3 block h-1 w-20 rounded-full bg-[#6f6659]" />
                      <span className="mb-2 block h-1 w-28 rounded-full bg-[#565044]" />
                      <span className="mb-2 block h-1 w-16 rounded-full bg-[#565044]" />
                      <span className="block h-1 w-24 rounded-full bg-[#37322b]" />
                    </div>
                  </div>

                  <div className="min-h-[320px] relative">
                    <div className="flex items-center gap-4 border-b border-[#403a32] px-6 py-5">
                      <span className="flex h-8 w-8 items-center justify-center rounded border border-[#b59765] bg-[#d5bb85] text-[#11100e]">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 15c6 0 9-3 9-9" />
                          <path d="M14 6h5v5" />
                          <path d="M4 20h16" />
                        </svg>
                      </span>
                      <h3 className="text-2xl font-black tracking-[-0.03em] text-[#f1e7d8]">
                        Ravi Ranjan
                      </h3>
                    </div>
                    <TerminalReveal activeTab={activeTab} />
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-[#4b443a] px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-[#d7c198]">
                   {activeTab} Mode
                  <span className="ml-4 h-px w-12 bg-[#b59765]" />
                </div>
              </div>
            </div>
          </MagneticCard>
        </div>

        <MotionDiv
          className="mt-12 rounded-[1.8rem] border border-[#6d6253] bg-[#10100f] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:p-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {disciplines.map((item) => (
              <MagneticCard
                key={item.title}
                className="group rounded-[1.15rem] relative overflow-hidden border border-[#4d453b] bg-[#151513] p-6 transition-colors duration-300 hover:border-[#a5885b] hover:bg-[#191815]"
              >
                {/* Micro hover gradient inside cards */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="mb-6 flex items-center gap-4 relative z-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[#a5885b] text-[#e0c390]">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                      <MotionPath
                        d={item.icon}
                        pathLength={1}
                        initial={{ pathLength: 1 }}
                        whileHover={{ pathLength: 1 }}
                        className="[stroke-dasharray:1] [stroke-dashoffset:0] group-hover:[animation:about-draw_0.9s_ease_forwards]"
                      />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.03em] text-[#eee6d8]">
                    {item.title}
                  </h3>
                </div>
                <p className="min-h-24 border-t border-[#3e3931] pt-6 relative z-10 text-lg leading-8 text-[#cbc2b4] transition-colors duration-300 group-hover:text-[#efe5d7]">
                  {item.body}
                </p>
                <p className="mt-6 border-t border-[#3e3931] pt-4 relative z-10 text-base text-[#bda77f]">
                  - {item.meta}
                </p>
              </MagneticCard>
            ))}
          </div>
        </MotionDiv>
      </div>

      <style>{`
        @keyframes about-draw {
          0% {
            stroke-dashoffset: 1;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
