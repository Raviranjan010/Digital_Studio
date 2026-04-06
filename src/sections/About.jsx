import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const profileData = {
  name: "Ravi Ranjan Kashyap",
  role: "Full Stack Developer & UI/UX Enthusiast",
  location: "Bihar, India",
  education: "Lovely Professional University",
  experience: "02 Years",
  projects: "20+",
  specialization: ["Modern Web Apps", "AI Integration", "Performance Optimization"],
  philosophy: "Great ideas deserve exceptional execution",
  currently: "Building impactful digital experiences"
};

const metrics = [
  { 
    value: "02+", 
    label: "Years Experience", 
    suffix: "",
    gradient: "from-amber-400 via-yellow-500 to-amber-600"
  },
  { 
    value: "20", 
    label: "Projects Delivered", 
    suffix: "+",
    gradient: "from-yellow-400 via-amber-500 to-yellow-600"
  },
  { 
    value: "100", 
    label: "Client Satisfaction", 
    suffix: "%",
    gradient: "from-amber-500 via-yellow-400 to-amber-500"
  },
  { 
    value: "24", 
    label: "Support", 
    suffix: "/7",
    gradient: "from-yellow-500 via-amber-400 to-yellow-500"
  },
];

const skills = [
  {
    category: "Frontend Excellence",
    description: "Crafting pixel-perfect, responsive interfaces with modern frameworks and cutting-edge animation libraries.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    color: "#d4af37"
  },
  {
    category: "Backend Architecture",
    description: "Building scalable, secure server-side solutions with robust API design and database optimization.",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"],
    color: "#ffd700"
  },
  {
    category: "Design & Experience",
    description: "Creating intuitive user experiences through research-driven design and interaction patterns.",
    technologies: ["Figma", "Adobe XD", "UI/UX Design", "Prototyping", "User Research", "Accessibility"],
    color: "#cfb53b"
  },
];

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
   ══════════════════════════════════════════════════════════════ */
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const targetValue = parseInt(value);
          const increment = targetValue / (duration * 60);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
              setCount(targetValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 1000 / 60);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  );
};

/* ══════════════════════════════════════════════════════════════
   SECTION REVEAL WRAPPER
   ══════════════════════════════════════════════════════════════ */
const SectionReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, [delay]);

  return <div ref={ref}>{children}</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN ABOUT COMPONENT
   ══════════════════════════════════════════════════════════════ */
const About = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const profileCardRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // GSAP Animations
  useGSAP(() => {
    // Hero section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.to(heroRef.current, {
      scale: 0.95,
      borderRadius: "32px",
      ease: "none",
    });

    // Profile card 3D tilt effect
    if (profileCardRef.current) {
      gsap.to(profileCardRef.current, {
        scrollTrigger: {
          trigger: profileCardRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        rotateY: 5,
        rotateX: -5,
        ease: "none",
      });
    }

    // Parallax elements
    gsap.utils.toArray(".parallax-slow").forEach((element) => {
      gsap.to(element, {
        y: -80,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray(".parallax-fast").forEach((element) => {
      gsap.to(element, {
        y: -150,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* ═══════════════════════════════════════════
          BACKGROUND ELEMENTS
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)",
            filter: "blur(120px)",
            x: cursorPosition.x,
            y: cursorPosition.y,
          }}
        />
        
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
            filter: "blur(100px)",
            x: -cursorPosition.x,
            y: -cursorPosition.y,
          }}
        />

        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Geometric grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212,175,55,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212,175,55,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════ */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <div ref={heroRef} className="px-6 md:px-12 lg:px-20 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Section label */}
            <SectionReveal delay={0}>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-500/70">
                  About Me
                </span>
              </div>
            </SectionReveal>

            {/* Main heading */}
            <SectionReveal delay={0.1}>
              <h2 className="mb-8">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none mb-4"
                  >
                    Crafting Digital
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                  >
                    Experiences
                  </motion.div>
                </div>
              </h2>
            </SectionReveal>

            {/* Subtitle */}
            <SectionReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light">
                Where innovation meets execution. Building digital products that users love and businesses rely on.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Divider line */}
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* LEFT COLUMN - Story & Metrics */}
              <div className="lg:col-span-7 space-y-16">
                
                {/* Story */}
                <SectionReveal delay={0.1}>
                  <div className="space-y-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Building the Future, One Line at a Time
                    </h3>
                    
                    <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
                      <p>
                        I'm <span className="text-amber-400 font-medium">Ravi Ranjan</span>, a Full Stack Developer 
                        based in Bihar, India. Currently pursuing Computer Science at Lovely Professional University, 
                        I specialize in creating sophisticated web applications that bridge design and functionality.
                      </p>
                      
                      <p>
                        My approach combines <span className="text-white">technical precision</span> with 
                        {" "}<span className="text-white">creative vision</span>. I believe exceptional digital 
                        products emerge from the intersection of clean code, thoughtful design, and user-centered thinking.
                      </p>
                      
                      <p>
                        With over 2 years of experience and 20+ completed projects, I've developed a deep understanding 
                        of modern web technologies, performance optimization, and creating interfaces that feel natural 
                        and responsive.
                      </p>
                    </div>
                  </div>
                </SectionReveal>

                {/* Metrics Grid */}
                <SectionReveal delay={0.2}>
                  <div className="grid grid-cols-2 gap-6">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        className="group relative p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ 
                          borderColor: "rgba(212,175,55,0.5)",
                          backgroundColor: "rgba(212,175,55,0.05)",
                          y: -5
                        }}
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-500" />
                        
                        <div className="relative z-10">
                          <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                          </div>
                          <div className="text-sm text-neutral-500 uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>

                {/* Skills Section */}
                <SectionReveal delay={0.3}>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-8">
                      Expertise & Capabilities
                    </h3>
                    
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.category}
                          className="group relative"
                          onHoverStart={() => setActiveSkill(index)}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                          <div className="relative p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-amber-500/50">
                            
                            {/* Active indicator */}
                            <motion.div
                              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-yellow-600"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: activeSkill === index ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                            />

                            <div className="space-y-3 pl-2">
                              <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                {skill.category}
                              </h4>
                              
                              <p className="text-neutral-400 leading-relaxed">
                                {skill.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 pt-2">
                                {skill.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 text-xs font-mono rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* RIGHT COLUMN - Visual Elements */}
              <div className="lg:col-span-5 space-y-8 parallax-slow">
                
                {/* Profile Card */}
                <SectionReveal delay={0.2}>
                  <motion.div
                    ref={profileCardRef}
                    className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black"
                    style={{ 
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-yellow-500/20 opacity-50" />
                    
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(45deg, #d4af37, #ffd700, #cfb53b, #e5c100, #d4af37)",
                        backgroundSize: "400% 400%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-neutral-900 to-black" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 text-center">
                      
                      {/* Monogram */}
                      <motion.div
                        className="relative mb-8"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: false }}
                        transition={{ 
                          duration: 1.2, 
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <div className="text-9xl font-black text-transparent bg-gradient-to-br from-amber-400 to-yellow-600 bg-clip-text">
                          RR
                        </div>
                        
                        {/* Orbital rings */}
                        <motion.div
                          className="absolute inset-0 border-2 border-amber-500/30 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          style={{ scale: 1.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 border border-dashed border-yellow-500/20 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          style={{ scale: 1.5 }}
                        />
                      </motion.div>

                      {/* Name */}
                      <motion.h3
                        className="text-3xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        Ravi Ranjan
                      </motion.h3>

                      {/* Role */}
                      <motion.p
                        className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        Full Stack Developer
                      </motion.p>

                      {/* Location */}
                      <motion.div
                        className="flex items-center gap-2 text-neutral-400 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Bihar, India</span>
                      </motion.div>

                      {/* Decorative dots */}
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-amber-500/50"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </SectionReveal>

                {/* Philosophy Card */}
                <SectionReveal delay={0.4}>
                  <motion.div
                    className="relative p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden"
                    whileHover={{ 
                      borderColor: "rgba(212,175,55,0.5)",
                      backgroundColor: "rgba(212,175,55,0.05)"
                    }}
                  >
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <svg className="text-amber-500/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>

                    <blockquote className="relative z-10 pt-4">
                      <p className="text-lg text-neutral-300 leading-relaxed italic mb-4">
                        "Technology evolves rapidly—and so do I. Every project is an opportunity 
                        to push boundaries, learn something new, and create experiences that matter."
                      </p>
                      <footer className="text-sm text-neutral-500 font-mono">
                        — Personal Philosophy
                      </footer>
                    </blockquote>
                  </motion.div>
                </SectionReveal>

                {/* Status Indicator */}
                <SectionReveal delay={0.5}>
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm"
                    whileHover={{ borderColor: "rgba(34,197,94,0.5)" }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34,197,94,0.7)",
                          "0 0 0 10px rgba(34,197,94,0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <span className="text-sm text-neutral-400">
                      Available for freelance opportunities
                    </span>
                  </motion.div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;