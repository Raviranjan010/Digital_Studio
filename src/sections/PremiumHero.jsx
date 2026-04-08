import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-scroll";
import "./premiumHero.css";

const heroStats = [
  {
    label: "Experience",
    value: "3+ Years",
    note: "Building thoughtful interfaces",
  },
  {
    label: "Projects",
    value: "50+ Completed",
    note: "Web products and portfolio systems",
  },
  {
    label: "Availability",
    value: "Open to Work",
    note: "Freelance and full-time opportunities",
  },
];

const codePreview = [
  "const portfolio = {",
  "  role: 'Designer & Developer',",
  "  focus: 'Frontend systems',",
  "  status: 'Available for work'",
  "};",
];

const entrance = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function PremiumHero() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const updateCursor = (event) => {
    if (!stageRef.current) return;

    const bounds = stageRef.current.getBoundingClientRect();
    setCursorState({
      active: true,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  const resetCursor = () => {
    setCursorState((current) => ({ ...current, active: false }));
  };

  return (
    <section className="premium-hero-shell" id="home">
      <div className="premium-hero-shell__frame">
        <div className="premium-hero-shell__top-line" />

        <div className="premium-hero-shell__grid">
          <div className="premium-hero-copy">
            <motion.div
              className="premium-hero-copy__badge"
              initial="hidden"
              animate="show"
              custom={0.05}
              variants={entrance}
            >
              <span className="premium-hero-copy__badge-dot" />
              Designer & Developer
            </motion.div>

            <motion.div
              className="premium-hero-copy__mini-card"
              initial="hidden"
              animate="show"
              custom={0.1}
              variants={entrance}
            >
              <div className="premium-hero-copy__mini-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="premium-hero-copy__mini-body">
                <div className="premium-hero-copy__mini-frame" />
                <strong>&lt;/&gt;</strong>
              </div>
            </motion.div>

            <motion.h1
              className="premium-hero-copy__headline"
              initial="hidden"
              animate="show"
              custom={0.16}
              variants={entrance}
            >
              Hello, I&apos;m Ravi <span>Ranjan</span>
            </motion.h1>

            <motion.div
              className="premium-hero-copy__role-ribbon"
              initial="hidden"
              animate="show"
              custom={0.22}
              variants={entrance}
            >
              <span>Designer & Developer</span>
            </motion.div>

            <motion.p
              className="premium-hero-copy__body"
              initial="hidden"
              animate="show"
              custom={0.28}
              variants={entrance}
            >
              I create polished websites and application interfaces that turn
              ideas into clean, usable, production-ready digital experiences.
            </motion.p>

            <motion.div
              className="premium-hero-copy__actions"
              initial="hidden"
              animate="show"
              custom={0.34}
              variants={entrance}
            >
              <Link
                to="work"
                smooth
                duration={900}
                offset={-32}
                className="premium-hero-copy__action premium-hero-copy__action--primary"
              >
                View My Work
              </Link>

              <Link
                to="contact"
                smooth
                duration={900}
                offset={-32}
                className="premium-hero-copy__action premium-hero-copy__action--secondary"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="premium-hero-stage"
            initial="hidden"
            animate="show"
            custom={0.14}
            variants={entrance}
          >
            <div
              ref={stageRef}
              className="premium-hero-stage__viewport"
              onMouseMove={updateCursor}
              onMouseEnter={updateCursor}
              onMouseLeave={resetCursor}
            >
              <div className="premium-hero-stage__ambient premium-hero-stage__ambient--orange" />
              <div className="premium-hero-stage__ambient premium-hero-stage__ambient--dark" />
              <div className="premium-hero-stage__mesh" />
              <div className="premium-hero-stage__orbit premium-hero-stage__orbit--one" />
              <div className="premium-hero-stage__orbit premium-hero-stage__orbit--two" />
              <div
                className={`premium-hero-stage__smoke ${cursorState.active ? "is-active" : ""}`}
                style={{
                  left: `${cursorState.x}px`,
                  top: `${cursorState.y}px`,
                }}
              >
                <span className="premium-hero-stage__smoke-core" />
                <span className="premium-hero-stage__smoke-ring premium-hero-stage__smoke-ring--one" />
                <span className="premium-hero-stage__smoke-ring premium-hero-stage__smoke-ring--two" />
              </div>
              <div className="premium-hero-stage__cursor-note">
                <span />
                Drag cards and layout pieces
              </div>
              <div className="premium-hero-stage__line premium-hero-stage__line--top" />
              <div className="premium-hero-stage__line premium-hero-stage__line--middle" />
              <div className="premium-hero-stage__line premium-hero-stage__line--bottom" />

              <motion.article
                className="premium-hero-sketch premium-hero-sketch--notes premium-hero-sketch--draggable"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.16}
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.02, rotate: 2 }}
              >
                <div className="premium-hero-sketch__sheet">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="premium-hero-sketch__sheet premium-hero-sketch__sheet--tilt">
                  <span />
                  <span />
                  <span />
                </div>
              </motion.article>

              <motion.article
                className="premium-hero-sketch premium-hero-sketch--wireframe premium-hero-sketch--draggable"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.14}
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.03, rotate: -3 }}
              >
                <div className="premium-hero-sketch__wire-head" />
                <div className="premium-hero-sketch__wire-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </motion.article>

              <motion.article
                className="premium-hero-monitor"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.12}
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.015 }}
              >
                <div className="premium-hero-monitor__screen">
                  <div className="premium-hero-monitor__top">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="premium-hero-monitor__code">
                    {codePreview.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="premium-hero-monitor__stand" />
                <div className="premium-hero-monitor__desk">
                  <span />
                  <span />
                </div>
              </motion.article>

              <div className="premium-hero-icons premium-hero-icons--bulb">
                <div className="premium-hero-icons__bulb" />
              </div>

              <div className="premium-hero-icons premium-hero-icons--gear">
                <span />
                <span />
              </div>

              <motion.article
                className="premium-hero-feature premium-hero-feature--code"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.18}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4, boxShadow: "0 18px 30px rgba(17,17,17,0.08)" }
                }
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.04 }}
              >
                <h2>Code Preview</h2>
                <p>Frontend architecture with clean, scalable implementation.</p>
              </motion.article>

              <motion.article
                className="premium-hero-feature premium-hero-feature--ui"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.18}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4, boxShadow: "0 18px 30px rgba(17,17,17,0.08)" }
                }
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.04 }}
              >
                <h2>UI Systems</h2>
                <p>Balanced layout, strong hierarchy, and premium visual control.</p>
              </motion.article>

              <motion.div
                className="premium-hero-portrait"
                drag={!prefersReducedMotion}
                dragConstraints={stageRef}
                dragElastic={0.1}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }
                }
                whileDrag={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="premium-hero-portrait__panel">
                  <div className="premium-hero-portrait__meta">
                    <p className="premium-hero-portrait__meta-label">Featured Profile</p>
                    <strong className="premium-hero-portrait__meta-value">
                      Ravi Ranjan
                    </strong>
                  </div>

                  <div className="premium-hero-portrait__image-wrap">
                    <img
                      src="/ravi_.png"
                      alt="Ravi Ranjan portrait"
                      className="premium-hero-portrait__image"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="premium-hero-stats-bar"
          initial="hidden"
          animate="show"
          custom={0.4}
          variants={entrance}
        >
          {heroStats.map((item) => (
            <article key={item.label} className="premium-hero-stats-bar__item">
              <div className="premium-hero-stats-bar__icon" />
              <div>
                <span className="premium-hero-stats-bar__label">{item.label}</span>
                <strong className="premium-hero-stats-bar__value">{item.value}</strong>
                <p className="premium-hero-stats-bar__note">{item.note}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PremiumHero;
