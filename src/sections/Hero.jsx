import { motion } from "framer-motion";
import { Link } from "react-scroll";

const metrics = [
  { value: "3+", label: "Years building production-ready interfaces" },
  { value: "12+", label: "Projects shipped across product and brand work" },
  { value: "AI", label: "Workflows blended with product thinking" },
];

const specialties = [
  "Full Stack Engineering",
  "UI/UX Systems",
  "Creative Development",
];

const cardTags = ["React", "Node", "UI Systems", "Motion"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#070707] text-white"
    >
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 28%, rgba(207,163,85,0.16), transparent 22%), radial-gradient(circle at 68% 55%, rgba(207,163,85,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 24%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "94px 94px",
            maskImage:
              "linear-gradient(to right, transparent 4%, black 28%, black 96%, transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #070707 0%, rgba(7,7,7,0.92) 36%, rgba(7,7,7,0.55) 58%, rgba(7,7,7,0.2) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] items-center px-5 pb-14 pt-28 md:px-10 md:pt-32 lg:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-10">
          <div className="relative z-10 max-w-[760px]">
            <motion.div
              className="mb-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/55"
              initial="hidden"
              animate="visible"
              custom={0.05}
              variants={fadeUp}
            >
              <span className="rounded-full border border-[#cfa355]/35 px-4 py-2 text-[#d8b26b]">
                Based in India
              </span>
              <span>Designing systems, not just screens</span>
            </motion.div>

            <motion.div
              className="mb-6"
              initial="hidden"
              animate="visible"
              custom={0.12}
              variants={fadeUp}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/38">
                Ravi Ranjan
              </p>
              <h1
                className="max-w-[8ch] text-[70px] font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#f3efe8] sm:text-[92px] md:text-[118px] lg:text-[132px]"
                style={{ fontFamily: '"Amiamie-Round", "Amiamie", sans-serif' }}
              >
                Full stack
                <span className="block text-[#cfa355]">engineer</span>
              </h1>
            </motion.div>

            <motion.div
              className="mb-8 max-w-[720px]"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
            >
              <p
                className="mb-3 text-[22px] font-light leading-[1.2] text-[#d7b06a] sm:text-[28px]"
                style={{ fontFamily: '"Amiamie", sans-serif', fontStyle: "italic" }}
              >
                UI systems, product thinking, and modern web craft.
              </p>
              <p className="max-w-[36rem] text-base leading-8 text-white/68 sm:text-xl">
                I build polished digital products with a sharp eye for layout,
                interaction, and scalability, turning strong visual direction into
                high-performance frontend and full stack experiences.
              </p>
            </motion.div>

            <motion.div
              className="mb-10 flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              custom={0.28}
              variants={fadeUp}
            >
              <Link
                to="work"
                smooth
                duration={900}
                offset={-40}
                className="cursor-pointer rounded-2xl border border-[#cfa355] bg-[#cfa355] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                View work
              </Link>
              <Link
                to="contact"
                smooth
                duration={900}
                offset={-40}
                className="cursor-pointer rounded-2xl border border-white/14 bg-white/[0.03] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Hire me
              </Link>
            </motion.div>

            <motion.div
              className="grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3"
              initial="hidden"
              animate="visible"
              custom={0.36}
              variants={fadeUp}
            >
              {metrics.map((item) => (
                <div key={item.label} className="pr-4">
                  <p className="mb-2 text-3xl font-black tracking-[-0.05em] text-[#f3efe8]">
                    {item.value}
                  </p>
                  <p className="max-w-[16rem] text-sm leading-6 text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[620px] lg:mx-0"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[0.92] w-full">
              <div className="absolute inset-0 rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]" />
              <div className="absolute left-[6%] top-[7%] h-[76%] w-[76%] rounded-[28px] border border-[#cfa355]/18 bg-[#0c0c0d]" />

              <div className="absolute bottom-[7%] right-[6%] h-[82%] w-[62%] rotate-[8deg] rounded-[30px] border border-[#d1b06b]/22 bg-[linear-gradient(180deg,#101011,#070707)] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.35)]">
                <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/6 bg-[#0a0a0b] px-5 py-6">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(207,163,85,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(207,163,85,0.12) 1px, transparent 1px)",
                      backgroundSize: "64px 64px",
                      maskImage:
                        "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/35">
                    <span>Rr</span>
                    <span>Portfolio 2026</span>
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
                    <div className="relative flex h-[240px] w-[240px] items-center justify-center rounded-full border border-[#cfa355]/25">
                      <div className="absolute h-[190px] w-[190px] rounded-full border border-[#cfa355]/20" />
                      <div className="absolute h-[260px] w-[120px] rotate-[26deg] rounded-full border border-[#cfa355]/18" />
                      <div className="absolute h-[240px] w-[110px] -rotate-[32deg] rounded-full border border-[#cfa355]/14" />
                      <span
                        className="text-[88px] font-black uppercase leading-none tracking-[-0.08em] text-[#d6ac62]"
                        style={{ fontFamily: '"Amiamie-Round", "Amiamie", sans-serif' }}
                      >
                        RR
                      </span>
                    </div>

                    <div className="mt-10 text-center">
                      <p className="text-[11px] uppercase tracking-[0.42em] text-[#f3efe8]">
                        Full Stack Engineer
                      </p>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.38em] text-white/32">
                        UI / UX / Product / Motion
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto flex flex-wrap gap-2">
                    {cardTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute left-[2%] top-[16%] max-w-[220px] rounded-[24px] border border-white/10 bg-black/55 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#d8b26b]">
                  Expertise
                </p>
                <div className="mt-4 space-y-3">
                  {specialties.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-white/6 pb-3 text-sm text-white/72 last:border-b-0 last:pb-0"
                    >
                      <span>{item}</span>
                      <span className="text-[10px] uppercase tracking-[0.26em] text-white/28">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-[10%] left-[8%] max-w-[260px] rounded-[24px] border border-[#cfa355]/18 bg-[#0a0a0a]/88 p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/34">
                  Positioning
                </p>
                <p className="mt-3 text-lg leading-7 text-[#f4efe4]">
                  Building premium interfaces that feel composed, fast, and
                  unmistakably intentional.
                </p>
              </div>

              <div className="absolute bottom-[8%] right-[-14px] flex h-[180px] w-10 flex-col items-center justify-between">
                <span className="h-3 w-3 rounded-full bg-[#cfa355]" />
                <span className="h-full w-px bg-[linear-gradient(180deg,rgba(207,163,85,0.7),rgba(255,255,255,0.12))]" />
                <div className="flex flex-col gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#cfa355]/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
