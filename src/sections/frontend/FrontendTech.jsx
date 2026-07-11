const TECH_CATEGORIES = [
  {
    title: "Core Frontend",
    skills: ["HTML5", "CSS3 / Sass", "JavaScript (ES6+)", "TypeScript"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Redux Toolkit", "Framer Motion", "GSAP"]
  },
  {
    title: "Styling & UI",
    skills: ["Tailwind CSS", "Styled Components", "Radix UI", "Shadcn UI"]
  },
  {
    title: "Tools & Testing",
    skills: ["Git", "Webpack / Vite", "Jest", "React Testing Library"]
  }
];

export default function FrontendTech() {
  return (
    <section id="tech" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Tech Stack & Capabilities
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl">
          I leverage modern tools and frameworks to build scalable applications, focusing on performance, accessibility, and maintainability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TECH_CATEGORIES.map((category) => (
          <div key={category.title} className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 pb-4 border-b border-slate-100">
              {category.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {category.skills.map((skill) => (
                <li key={skill} className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
