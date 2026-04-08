import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import AnimatedHeaderSection from "../components/layout/AnimatedHeaderSection";

const initialCategories = {
  languages: {
    id: "languages",
    title: "Languages I Know",
    icon: "mdi:code-tags",
    items: [
      { id: "react", name: "React", icon: "logos:react", color: "inherit", usage: "Frontend apps, dynamic UIs, state management." },
      { id: "python", name: "Python", icon: "logos:python", color: "inherit", usage: "Backend logic, scripting, data processing." },
      { id: "cpp", name: "C++", icon: "logos:c-plusplus", color: "inherit", usage: "Performance-critical systems, native integrations." },
    ],
  },
  tools: {
    id: "tools",
    title: "Tools I Use",
    icon: "mdi:wrench-outline",
    items: [
      { id: "vscode", name: "VS Code", icon: "logos:visual-studio-code", color: "inherit", usage: "Daily driver IDE with advanced extensions." },
      { id: "git", name: "Git", icon: "logos:git-icon", color: "inherit", usage: "Version control and collaborative development." },
      { id: "github", name: "GitHub", icon: "mdi:github", color: "white", usage: "Code hosting, CI/CD pipelines, open-source." },
      { id: "premiere", name: "Premiere Pro", icon: "logos:adobe-premiere", color: "inherit", usage: "High-end video editing, color grading." },
      { id: "davinci", name: "DaVinci Resolve", icon: "simple-icons:davinciresolve", color: "#fff", usage: "Advanced color correction and post-production." },
      { id: "others", name: "Other Tools", icon: "mdi:application-cog", color: "#9c9589", usage: "Various utility scripts and system configurations." },
    ],
  },
  ai: {
    id: "ai",
    title: "AI Tools I Use",
    icon: "mdi:robot-outline",
    items: [
      { id: "elevenlabs", name: "ElevenLabs", icon: "simple-icons:elevenlabs", color: "white", usage: "AI voice generation and text-to-speech." },
      { id: "claude", name: "Claude", icon: "simple-icons:anthropic", color: "#d7bd8a", usage: "Deep coding assistance and logic reasoning." },
      { id: "veo3", name: "Veo3", icon: "mdi:video-check-outline", color: "#a5885b", usage: "AI video and motion enhancement tools." },
      { id: "chatgpt", name: "ChatGPT", icon: "logos:openai-icon", color: "inherit", usage: "General-purpose AI assistant and brainstorming." },
      { id: "midjourney", name: "Midjourney", icon: "simple-icons:midjourney", color: "white", usage: "High-quality AI image generation and conceptual art." },
      { id: "huggingface", name: "Hugging Face", icon: "logos:hugging-face", color: "inherit", usage: "Open-source ML models and datasets." },
    ],
  },
};

const SkillBadge = ({ tech, isFocused, hoverId, onHoverStart, onHoverEnd, onClick }) => {
  const isDimmed = hoverId && hoverId !== tech.id;

  return (
    <Reorder.Item
      value={tech}
      id={tech.id}
      onHoverStart={() => onHoverStart(tech.id)}
      onHoverEnd={onHoverEnd}
      onClick={() => onClick(tech)}
      whileHover={{ y: -4, scale: 1.05 }}
      whileDrag={{ scale: 1.1, rotate: Math.random() * 4 - 2, zIndex: 50, cursor: "grabbing" }}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-[0.85rem] border border-[#302c25] bg-[#121110] text-[#ded6ca] shadow-sm transition-all duration-300 cursor-grab active:cursor-grabbing hover:border-[#8d7654] hover:bg-[#1a1918] hover:text-[#f4eadb] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${isDimmed ? "opacity-30 scale-[0.98] grayscale-[0.5]" : "opacity-100"
        }`}
    >
      <Icon
        icon={tech.icon}
        style={{ color: tech.color || "inherit" }}
        className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-sm font-medium tracking-wide pointer-events-none">{tech.name}</span>
    </Reorder.Item>
  );
};

const BentoCardTilt = ({ title, icon, items, categoryId, onCategoryUpdate, hoverId, setHoverId, setSelectedSkill, delay = 0, className }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full flex flex-col rounded-[1.4rem] border border-[#262420] bg-[#0c0b0a] p-6 sm:p-8 transition-colors duration-500 hover:border-[#3e3931] shadow-[0_12px_40px_rgba(0,0,0,0.6)] group overflow-hidden"
      >
        {/* Subtle Matte Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#201e1a] transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <span className="flex items-center justify-center w-11 h-11 rounded-[0.65rem] border border-[#a5885b]/30 bg-[#a5885b]/5 text-[#d7bd8a] shadow-inner">
            <Icon icon={icon} className="w-5 h-5 text-current" />
          </span>
          <h3 className="text-lg font-bold tracking-[0.15em] uppercase text-[#f4eadb]">
            {title}
          </h3>
        </div>

        <div className="flex-1 transform-gpu" style={{ transform: "translateZ(40px)" }}>
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={(newOrder) => onCategoryUpdate(categoryId, newOrder)}
            className="flex flex-wrap gap-3"
            layoutScroll
          >
            {items.map((tech) => (
              <SkillBadge
                key={tech.id}
                tech={tech}
                hoverId={hoverId}
                onHoverStart={setHoverId}
                onHoverEnd={() => setHoverId(null)}
                onClick={setSelectedSkill}
              />
            ))}
          </Reorder.Group>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TechStack() {
  const [categories, setCategories] = useState(initialCategories);
  const [hoverId, setHoverId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Custom Cursor
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const cursorX = useSpring(mousePos.x, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(mousePos.y, { stiffness: 450, damping: 30 });

  useEffect(() => {
    const handleGlobalMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMove);
    return () => window.removeEventListener("mousemove", handleGlobalMove);
  }, []);

  const handleCategoryUpdate = (categoryId, newItems) => {
    setCategories((prev) => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], items: newItems },
    }));
  };

  return (
    <section
      className="relative w-full bg-[#050505] px-5 py-32 sm:px-8 lg:px-12 selection:bg-[#a5885b]/30 min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
    >
      {/* Background Deep Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(#f4eadb 1px, transparent 1px), linear-gradient(90deg, #f4eadb 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto">
        {/* Header */}
        <AnimatedHeaderSection
          subTitle={"Expertise"}
          title={"The Arsenal"}
          text={`Precision tools for complex problems. 
          Mastering modern technologies to engineer scalable architectures 
          and craft visually striking interactive experiences.`}
          textColor={"text-[#f4eadb]"}
          withScrollTrigger={true}
        />

        {/* 3-Section Grid Alignment */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <BentoCardTilt
            categoryId="languages"
            title={categories.languages.title}
            icon={categories.languages.icon}
            items={categories.languages.items}
            onCategoryUpdate={handleCategoryUpdate}
            hoverId={hoverId}
            setHoverId={setHoverId}
            setSelectedSkill={setSelectedSkill}
            delay={0.1}
            className="md:col-span-1"
          />

          <BentoCardTilt
            categoryId="tools"
            title={categories.tools.title}
            icon={categories.tools.icon}
            items={categories.tools.items}
            onCategoryUpdate={handleCategoryUpdate}
            hoverId={hoverId}
            setHoverId={setHoverId}
            setSelectedSkill={setSelectedSkill}
            delay={0.2}
            className="md:col-span-1"
          />

          <BentoCardTilt
            categoryId="ai"
            title={categories.ai.title}
            icon={categories.ai.icon}
            items={categories.ai.items}
            onCategoryUpdate={handleCategoryUpdate}
            hoverId={hoverId}
            setHoverId={setHoverId}
            setSelectedSkill={setSelectedSkill}
            delay={0.3}
            className="md:col-span-1 md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-1"
          />
        </div>
      </div>

      {/* Floating Spotlight Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
        style={{ x: cursorX, y: cursorY, opacity: showCursor ? 1 : 0 }}
      >
        <motion.div
          animate={{ scale: hoverId ? 1.5 : 1, opacity: hoverId ? 1 : 0.2 }}
          transition={{ duration: 0.2 }}
          className="w-12 h-12 -ml-6 -mt-6 rounded-full border border-white flex items-center justify-center backdrop-blur-sm"
        >
          {hoverId && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[0.5rem] uppercase font-bold text-white whitespace-nowrap px-2"
            >
              Explore
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Detail Popup Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={selectedSkill.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-[#3e3931] bg-[#0c0b0a] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#1a1918] transition-colors text-[#9c9589] hover:text-white"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-6 mt-4">
                <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-[#121110] border border-[#201e1a] shadow-inner">
                  <Icon
                    icon={selectedSkill.icon}
                    style={{ color: selectedSkill.color || "inherit" }}
                    className="w-12 h-12"
                  />
                </div>

                <div>
                  <h4 className="text-2xl font-black tracking-tight text-[#f4eadb] mb-2">{selectedSkill.name}</h4>
                  <p className="text-sm text-[#9c9589] leading-relaxed max-w-[280px] mx-auto">
                    {selectedSkill.usage}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3e3931] to-transparent my-2" />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-2.5 rounded-full bg-[#f4eadb] text-[#050505] text-sm font-bold tracking-wide uppercase transition-colors hover:bg-white"
                >
                  Close Detail
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
