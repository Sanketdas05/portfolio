export const PROJECTS = [
  {
    slug: 'pace',
    title: 'Pace',
    subtitle: 'Gamified Task Manager',
    theme: 'pace',
    liveUrl: 'https://pace-manager.web.app/',
    repoUrl: '',
    thumbnail: '/images/project_pace.png',
    images: ['/images/project_pace.png'],
    featured: true,
    
    // CREATIVE FIELDS
    creative: {
      curatorsNote: 'I wanted to build a system that made starting tasks feel effortless.',
      chapters: [
        {
          chapter: '01',
          title: 'The Idea',
          content: 'Productivity apps feel like spreadsheets. I wanted a game. A system where every small step provided a hit of momentum.'
        },
        {
          chapter: '02',
          title: 'The Challenge',
          content: 'Handling offline capabilities seamlessly. Users need to check off tasks with no connection, and have everything instantly synchronize later.'
        },
        {
          chapter: '03',
          title: 'The Approach',
          content: 'I prioritized local state for instant feedback. Then I integrated AI to automatically break down intimidating tasks into micro-steps.'
        }
      ],
      technicalDecisions: [
        {
          tech: 'React.js',
          problem: 'Complex UI state (xp bars, level ups) was hard to manage.',
          reason: 'Selected for its component architecture and state management.',
          advantage: 'Encapsulated gamification logic cleanly.'
        },
        {
          tech: 'Framer Motion',
          problem: 'Standard CSS transitions were too rigid for complex sequences.',
          reason: 'Provides a declarative API for physics-based spring animations.',
          advantage: 'Transformed static changes into satisfying physical interactions.'
        }
      ]
    },

    // ENGINEERING FIELDS
    engineering: {
      summary: "A high-performance gamified task management system prioritizing instant offline-first capabilities and optimistic UI updates.",
      problem: "Traditional productivity tools lack immediate feedback and often block user interaction during network syncing.",
      solution: "Engineered a local-first state architecture using robust state management to ensure all interactions are instantly reflected in the UI.",
      architecture: "React, Local Storage Sync, Web Workers for background tasks.",
      techStack: ["React", "JavaScript", "Context API", "Tailwind CSS", "Firebase"],
      challenges: "Synchronizing complex gamification state (XP, levels, streaks) between offline client and cloud database without conflicts.",
      results: "Achieved zero-latency UI updates and flawless offline capability.",
      lessonsLearned: "Optimistic UI requires careful error handling and rollback mechanisms to maintain data integrity."
    }
  },
  {
    slug: 'bmw-m4',
    title: 'BMW M4 Configurator',
    subtitle: 'Interactive 3D WebGL Configurator',
    theme: 'bmw',
    liveUrl: 'https://bmw-m4-showcase-vlxf.vercel.app/',
    repoUrl: '',
    thumbnail: '/images/project_bmw.png',
    images: ['/images/project_bmw.png'],
    featured: true,

    // CREATIVE FIELDS
    creative: {
      curatorsNote: 'I wanted to prove that the web browser can be a high-performance graphics engine.',
      chapters: [
        {
          chapter: '01',
          title: 'The Idea',
          content: 'Car configurators usually feel disconnected. I wanted a fluid, real-time 3D experience with physical presence.'
        },
        {
          chapter: '02',
          title: 'The Challenge',
          content: 'Optimization. Maintaining extreme visual fidelity (metallic flakes, glass refraction) while keeping the payload under 15MB.'
        },
        {
          chapter: '03',
          title: 'The Approach',
          content: 'I used Draco compression to shrink geometry. I baked ambient occlusion into textures. I lazy-loaded interior details.'
        }
      ],
      technicalDecisions: [
        {
          tech: 'React Three Fiber',
          problem: 'Managing complex Three.js scenes imperatively becomes a chaotic mess.',
          reason: 'Brings React\'s declarative paradigm to the WebGL canvas.',
          advantage: 'Treated 3D objects as React components with local state.'
        }
      ]
    },

    // ENGINEERING FIELDS
    engineering: {
      summary: "A highly optimized 3D configurator focusing on flawless performance and sub-second asset streaming.",
      problem: "Traditional 3D web experiences suffer from long load times and dropped frames on mobile devices.",
      solution: "Implemented aggressive Draco compression, texture baking, and progressive rendering.",
      architecture: "React Three Fiber, GLSL Shaders, Vercel Edge Cache.",
      techStack: ["React Three Fiber", "Three.js", "GLSL", "Context API", "Framer Motion"],
      challenges: "Handling real-time reflections and refractions without killing the framerate.",
      results: "Achieved a steady 60fps on mid-tier mobile devices. Initial load payload reduced to under 12MB.",
      lessonsLearned: "What you don't render is just as important as what you do. Optimization must happen at the asset level before code."
    }
  },
  {
    slug: 'infinity-castle',
    title: 'Infinity Castle',
    subtitle: 'Demon Slayer Interactive Concept',
    theme: 'infinity',
    liveUrl: 'https://demon-slayer-infinity-castle.vercel.app/',
    repoUrl: '',
    thumbnail: '/images/project_immersive.png',
    images: ['/images/project_immersive.png'],
    featured: true,

    // CREATIVE FIELDS
    creative: {
      curatorsNote: 'This was an experiment in bending the browser. Making scrolling feel like falling through space.',
      chapters: [
        {
          chapter: '01',
          title: 'The Idea',
          content: 'I wanted to recreate the gravity-defying disorientation of the Infinity Castle using web technologies.'
        },
        {
          chapter: '02',
          title: 'The Challenge',
          content: 'Tying dozens of high-resolution transforms to the scrollbar without causing catastrophic jank.'
        },
        {
          chapter: '03',
          title: 'The Approach',
          content: 'I moved everything to the GPU. I strictly animated transforms and opacity, avoiding layout-triggering properties.'
        }
      ],
      technicalDecisions: [
        {
          tech: 'GSAP ScrollTrigger',
          problem: 'Native scroll-jacking is terrible for accessibility and UX.',
          reason: 'Seamlessly maps native scroll positions to complex timelines.',
          advantage: 'Created parallax without compromising browser scroll physics.'
        }
      ]
    },

    // ENGINEERING FIELDS
    engineering: {
      summary: "An experimental, high-performance scroll-driven application demonstrating advanced DOM manipulation.",
      problem: "Complex scroll-linked animations usually cause layout thrashing and severe dropped frames.",
      solution: "Decoupled the animation loop from the main thread using RequestAnimationFrame and GPU-accelerated transforms.",
      architecture: "Vanilla JS / React, GSAP ScrollTrigger, Lenis Smooth Scroll.",
      techStack: ["React", "GSAP", "Lenis", "Tailwind CSS"],
      challenges: "Synchronizing 3D transform matrices across 50+ elements based on a single scroll progress value.",
      results: "Zero layout thrashing. Maintained a composite layer count under 100 to prevent memory leaks.",
      lessonsLearned: "Hardware acceleration is mandatory. Always animate `transform` and `opacity`, never `top` or `left`."
    }
  }
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "KaYa Media",
    period: "Aug 2025 - Oct 2025",
    description: "",
    achievements: [
      "Developing responsive and interactive web interfaces using React.js, JavaScript, and modern CSS frameworks including Tailwind CSS.",
      "Implementing advanced animations and visual effects using GSAP to enhance user engagement and create smooth, professional interactions.",
      "Building 3D web experiences with Three.js, optimizing performance for cross-browser compatibility and mobile responsiveness.",
      "Collaborating with design and backend teams to translate UI/UX designs into pixel-perfect, accessible web applications.",
      "Optimizing application performance through code splitting, lazy loading, and efficient rendering techniques."
    ]
  }
];

export const EDUCATION = [
  {
    id: 1,
    degree: "B.Tech in Computer Science",
    institution: "University of Technology",
    period: "2018 - 2022",
    details: "Focused on Software Engineering, Data Structures, and Web Technologies. Graduated with Honors."
  }
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "HTML5", "CSS3 / Sass"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Redux", "Tailwind CSS", "Radix UI", "Framer Motion", "Three.js", "GSAP"]
  },
  {
    category: "Architecture & Tools",
    items: ["Component-Driven UI", "REST / GraphQL", "Git", "Webpack / Vite", "Jest", "Vercel"]
  }
];
