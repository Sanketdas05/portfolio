import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../config/projects';
import ProjectPageCanvas from './ProjectPageCanvas';
import ProjectBackground from './ProjectBackground';
import { ChapterPanel, TechPanel } from './ProjectPanels';
import { FiArrowLeft } from 'react-icons/fi';

export default function ProjectPage() {
  const { slug } = useParams();
  
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    document.body.classList.add('theme-dark');
    // Tiny delay ensures this fires after route transitions and overrides native browser scroll restoration
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, [slug]);

  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-[var(--container-padding)]">
        <h2 className="text-[var(--text-2xl)] font-heading font-bold uppercase mb-4">Room Not Found</h2>
        <RouterLink to="/creative#work" className="font-body text-[var(--text-sm)] text-[var(--color-accent)] hover:underline uppercase tracking-wider">Return to Exhibition</RouterLink>
      </section>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  


  // Typography Scales
  const tHuge = "text-[clamp(3rem,8vw,8rem)] font-heading font-black uppercase leading-[0.9] tracking-tighter text-[var(--color-text-primary)] mix-blend-difference";
  const tMedium = "text-[clamp(1.2rem,2.5vw,2rem)] font-body italic font-light leading-[1.5] text-[var(--color-text-primary)] mix-blend-difference";
  const tSmall = "text-[16px] md:text-[20px] font-body leading-[2] font-medium text-[var(--color-text-primary)] max-w-[35ch]";
  const tTiny = "font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-accent)]";

  return (
    <main className="relative w-full bg-[var(--color-bg)]">
      <ProjectBackground theme={project.theme} />

      <div className="relative z-10 w-full overflow-hidden">
        
        {/* =========================================
            PANEL 1: THE TITLE (Bottom-Left Heavy)
            ========================================= */}
        <section className="min-h-[80svh] pt-32 w-full px-8 md:px-16 flex flex-col justify-end pb-48 relative">
          
          <RouterLink to="/creative#work" className={`absolute top-32 left-8 md:left-16 ${tTiny} text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 mix-blend-difference`}>
            <FiArrowLeft size={12} /> Exit Room
          </RouterLink>

          <span className={`absolute top-32 right-8 md:right-16 ${tTiny} text-[var(--color-text-muted)] mix-blend-difference text-right`}>
            Exhibition / {projectIndex + 1}<br/>{project.slug}
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={tHuge}
          >
            {project.title}
          </motion.h1>
        </section>

        {/* =========================================
            PANEL 2: THE HOOK (Center-Right Heavy)
            ========================================= */}
        <section className="py-24 w-full px-8 md:px-16 flex items-center justify-end border-t border-[rgba(255,255,255,0.05)]">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2 }}
            className={`${tMedium} max-w-[30ch] text-right`}
          >
            "{project.curatorsNote}"
          </motion.p>
        </section>

        {/* =========================================
            PANEL 3: THE VISUAL (Full Bleed Dominance)
            ========================================= */}
        <section className="min-h-[80svh] py-16 w-full flex flex-col items-center justify-center relative px-8 md:px-16">
          <span className={`absolute bottom-8 left-8 md:left-16 ${tTiny} text-[var(--color-text-muted)] z-40`}>
            Fig 01. Visual Prototype
          </span>
          <div className="w-full relative z-30">
            <ProjectPageCanvas imagePath={project.thumbnail} />
          </div>
        </section>

        {[0, 1, 2].map((i) => (
          <div key={i}>
            <ChapterPanel data={project.chapters?.[i]} tTiny={tTiny} tSmall={tSmall} index={i} />
            <TechPanel data={project.technicalDecisions?.[i]} tTiny={tTiny} tMedium={tMedium} tSmall={tSmall} index={i} />
          </div>
        ))}

        {/* =========================================
            PANEL 10: INTERACTIVE LINKS (Interactive Poster)
            ========================================= */}
        {(project.liveUrl || project.repoUrl) && (
          <section className="py-32 min-h-[60svh] w-full px-8 flex flex-col justify-center items-center bg-[var(--color-accent)] text-[#0a0908] relative overflow-hidden">
            <span className={`absolute top-8 left-8 ${tTiny} !text-[#0a0908] opacity-50`}>
              Interactive Layer
            </span>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col gap-12 w-full max-w-[1400px]"
            >
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center w-full border-b border-[#0a0908] pb-4">
                  <span className={`${tHuge} !text-[#0a0908] !mix-blend-normal`}>Experience</span>
                  <span className="text-[clamp(2rem,6vw,5rem)] text-[#0a0908] opacity-0 -translate-x-12 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center w-full border-b border-[#0a0908] pb-4">
                  <span className={`${tHuge} !text-[#0a0908] !mix-blend-normal`}>Source Code</span>
                  <span className="text-[clamp(2rem,6vw,5rem)] text-[#0a0908] opacity-0 -translate-x-12 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                </a>
              )}
            </motion.div>
          </section>
        )}

        {/* =========================================
            PANEL 11: AFTERMATH & EXIT
            ========================================= */}
        <section className="min-h-[70svh] w-full px-8 md:px-16 flex flex-col justify-between pt-32 pb-24 text-center relative z-20 bg-[var(--color-bg)]">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center flex-grow justify-center"
          >
            <span className={`${tTiny} text-[var(--color-text-muted)] mb-8`}>
              [ Final Reflection ]
            </span>
            <p className={`${tMedium} max-w-[30ch]`}>
              "{project.lessonsLearned}"
            </p>
          </motion.div>

          <RouterLink to={`/work/${nextProject.slug}`} className="group w-full flex flex-col items-center pt-24 border-t border-[rgba(255,255,255,0.05)] mt-16">
            <span className={`${tTiny} text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-4`}>
              Continue to next exhibit
            </span>
            <span className={`${tHuge} group-hover:text-[var(--color-accent)] transition-colors`}>
              {nextProject.title}
            </span>
          </RouterLink>
        </section>

      </div>
    </main>
  );
}
