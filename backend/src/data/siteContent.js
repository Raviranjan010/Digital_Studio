export const siteContent = {
  hero: {
    badge: "Full Stack Developer | UI/UX Enthusiast",
    title: ["Ravi", "Ranjan"],
    description:
      "Building digital experiences that feel effortless, with clean systems, immersive motion, and a sharp eye for detail from idea to launch.",
    availability: "Freelance & Collaboration",
    stats: [
      { value: "20+", label: "Projects Shipped" },
      { value: "02", label: "Years Building" },
      { value: "24/7", label: "Focused on Craft" },
    ],
    marquee: [
      "Responsive Interfaces",
      "Smooth Motion Design",
      "Creative Direction",
      "API Integration",
      "Performance Focused",
      "Product Thinking",
    ],
  },
  services: [
    {
      title: "Frontend Development",
      description:
        "Crafting pixel-perfect, responsive interfaces that feel effortless. From mobile-first layouts to interactive animations, every element is built to engage and delight users across all devices.",
      items: [
        {
          title: "HTML5 & CSS3",
          description: "(Responsive Design, Mobile-first, Modern Layouts)",
        },
        {
          title: "JavaScript (ES6+)",
          description: "(Interactive UI, DOM Manipulation, Dynamic Logic)",
        },
        {
          title: "Animations & Motion",
          description: "(CSS Animations, GSAP, Smooth Transitions)",
        },
      ],
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive user experiences that balance aesthetics with function. Every interface is prototyped, tested, and refined to ensure maximum usability and visual impact.",
      items: [
        {
          title: "Figma Prototyping",
          description: "(Wireframes, UI Design, Interactive Prototypes)",
        },
        {
          title: "Design Systems",
          description: "(Color Theory, Typography, Component Libraries)",
        },
        {
          title: "User-Centric Approach",
          description: "(UX Research, Accessibility, Responsive Patterns)",
        },
      ],
    },
    {
      title: "Backend & Database",
      description:
        "Building the foundation that powers great experiences. From server-side logic to database architecture, every system is designed for reliability, security, and scalability.",
      items: [
        {
          title: "Node.js & Server Logic",
          description: "(REST APIs, Authentication, Server Architecture)",
        },
        {
          title: "Database Management",
          description: "(MongoDB, Firebase, Data Modeling)",
        },
        {
          title: "API Integration",
          description: "(Third-Party Services, Payment Systems, Auth Flows)",
        },
      ],
    },
    {
      title: "Creative & Digital Tools",
      description:
        "Leveraging modern tools and AI to accelerate development and produce outstanding digital content. From video editing to AI-powered workflows, every tool serves a purpose.",
      items: [
        {
          title: "Canva & Visual Design",
          description: "(Graphics, Social Media, Brand Assets)",
        },
        {
          title: "Video Production",
          description: "(YouTube Content, Editing, Motion Graphics)",
        },
        {
          title: "AI Tools & Automation",
          description: "(ChatGPT, Generative AI, Workflow Optimization)",
        },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Advanced To-Do List App",
      description:
        "A feature-rich task management app with drag & drop, prioritization, local storage, and smooth animations for a clean productivity experience.",
      href: "#",
      image: "/assets/projects/todo-app.jpg",
      bgImage: "/assets/projects/todo-app.jpg",
      frameworks: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    },
    {
      id: 2,
      name: "BMI Calculator with Animated Graph",
      description:
        "Dynamic BMI calculation tool with animated graph visualization, health category indicators, and a modern responsive interface.",
      href: "#",
      image: "/assets/projects/bmi-calculator.jpg",
      bgImage: "/assets/projects/bmi-calculator.jpg",
      frameworks: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
    },
    {
      id: 3,
      name: "Smoke Effect Interactive Website",
      description:
        "A creative showcase featuring interactive smoke animations, unique design concepts, and performance-optimized visual effects.",
      href: "#",
      image: "/assets/projects/smoke-effect.jpg",
      bgImage: "/assets/projects/smoke-effect.jpg",
      frameworks: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    },
    {
      id: 4,
      name: "Sticker Tag Generator",
      description:
        "Custom tag creation tool with blinking animations, color customization, and a user-friendly interface for generating unique stickers.",
      href: "#",
      image: "/assets/projects/sticker-generator.jpg",
      bgImage: "/assets/projects/sticker-generator.jpg",
      frameworks: ["HTML5", "CSS3", "JavaScript", "DOM API"],
    },
    {
      id: 5,
      name: "E-Commerce Website",
      description:
        "A fully responsive online store with product listings, add-to-cart functionality, and a clean modern product layout.",
      href: "#",
      image: "/assets/projects/ecommerce-site.jpg",
      bgImage: "/assets/projects/ecommerce-site.jpg",
      frameworks: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    },
    {
      id: 6,
      name: "Portfolio Website (Advanced)",
      description:
        "A premium portfolio with smooth scrolling, animated sections, gradient effects, sticky navbar, and dark/light mode toggle.",
      href: "#",
      image: "/assets/projects/portfolio-advanced.jpg",
      bgImage: "/assets/projects/portfolio-advanced.jpg",
      frameworks: ["React", "GSAP", "Framer Motion", "Tailwind CSS"],
    },
  ],
  socials: [
    { name: "LinkedIn", href: "https://linkedin.com/in/raviranjan77" },
    { name: "GitHub", href: "https://github.com/raviranjan010" },
    { name: "YouTube", href: "#" },
    { name: "Email", href: "mailto:raviranjan01b@gmail.com" },
  ],
  strengths: {
    strengths: [
      "Detail-oriented design mindset",
      "Strong focus on user experience",
      "Fast learner & adaptive",
      "Creative problem solver",
      "Business + Tech combination mindset",
    ],
    futureGoals: [
      "Build scalable SaaS products",
      "Master Full Stack Development",
      "Create AI-powered tools",
      "Launch digital products & startups",
    ],
  },
  techStack: {
    frontend: ["HTML", "CSS", "JavaScript"],
    backend: ["Node.js"],
    database: ["MongoDB", "Firebase"],
    design: ["Figma", "Canva"],
    tools: ["GitHub", "VS Code"],
  },
  contact: {
    email: "raviranjan01b@gmail.com",
    phone: "+91 7909040348",
    based: "Bihar, India",
    responseTime: "Within 24 hours",
  },
};

export const siteSections = Object.keys(siteContent);
