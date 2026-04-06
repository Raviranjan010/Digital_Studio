// TechStackSection.jsx — Skills & Tech Stack (certifications moved to CertificatesSection)
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeaderSection from "../components/layout/AnimatedHeaderSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import { techStack } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const techIcons = {
  HTML: "logos:html-5",
  CSS: "logos:css-3",
  JavaScript: "logos:javascript",
  "Node.js": "logos:nodejs-icon",
  MongoDB: "logos:mongodb-icon",
  Firebase: "logos:firebase",
  Figma: "logos:figma",
  Canva: "devicon:canva",
  GitHub: "mdi:github",
  "VS Code": "logos:visual-studio-code",
};

const TechBadge = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 border border-white/10 rounded-xl hover:bg-white/5 border-transparent hover:border-gold/50 transition-all duration-500 group cursor-default">
      <Icon
        icon={techIcons[name] || "mdi:code-tags"}
        className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
      />
      <span className="text-sm font-light tracking-wider uppercase">
        {name}
      </span>
    </div>
  );
};

export default function ClientsLogo() {
  const itemsRef = useRef([]);
  const containerRef = useRef(null);
  const techRef = useRef(null);
  const text = `Continuous growth through learning
  and building. Earning recognition
  while shipping real products.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tech badges animation
      gsap.from(".tech-badge", {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  const allTech = [
    ...techStack.frontend,
    ...techStack.backend,
    ...techStack.database,
    ...techStack.design,
    ...techStack.tools,
  ];

  return (
    <section ref={containerRef} className="w-full pt-5 md:pt-10 lg:pt-16">
      <div className="">
        {/* Header */}
        <AnimatedHeaderSection
          subTitle={"Skills & Tech"}
          title={"Stack"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        {/* Tech Stack Grid */}
        <div className="mt-10 px-4 md:px-10 pb-10" ref={techRef}>
          <h3 className="text-2xl font-light tracking-wider uppercase mb-8 text-white/50">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {allTech.map((tech, index) => (
              <div
                key={index}
                className="tech-badge"
                ref={(el) => (itemsRef.current[index] = el)}
              >
                <TechBadge name={tech} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
