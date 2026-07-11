import { PROJECTS } from '../../config/data';

export default function FrontendProjects() {
  return (
    <section id="projects" className="mb-12">
      <h2 className="text-[20px] font-bold text-black mb-6">Selected Work</h2>
      <div className="flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <article key={project.slug} className="flex flex-col">
            <h3 className="text-[16px] font-bold text-black hover:underline decoration-black/20 underline-offset-4 w-max cursor-pointer mb-1">
              <a href={`/work/${project.slug}`}>
                {project.title}
              </a>
            </h3>
            <p className="text-[15px] text-black/70 leading-relaxed mb-2">
              {project.engineering?.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.engineering?.techStack?.map((tech) => (
                <span key={tech} className="text-[13px] text-black/50 bg-black/5 px-2 py-0.5 rounded-sm">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
