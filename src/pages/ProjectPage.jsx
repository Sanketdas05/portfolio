import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../config/data';
import { useMode } from '../context/ModeContext';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';

// Creative Components
import ProjectBackground from './creative/ProjectBackground';
import { ChapterPanel, TechPanel } from './creative/ProjectPanels';
import React, { Suspense } from 'react';

const ProjectPageCanvas = React.lazy(() => import('./creative/ProjectPageCanvas'));

export default function ProjectPage() {
  const { slug } = useParams();
  const { isEngineeringMode } = useMode();
  
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    // Only force theme-dark if we are in creative mode and the layout didn't catch it
    if (!isEngineeringMode) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    return () => {
      document.body.classList.remove('theme-dark');
    };
  }, [slug, isEngineeringMode]);

  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-[var(--container-padding)]">
        <h2 className="text-[24px] font-bold mb-4">Project Not Found</h2>
        <RouterLink to="/" className="text-[var(--color-accent)] hover:underline">Return Home</RouterLink>
      </section>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <AnimatePresence mode="wait">
      {!isEngineeringMode ? (
        // =========================================
        // CREATIVE MODE
        // =========================================
        <motion.main
          key="creative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-[var(--color-bg)]"
        >
          <ProjectBackground theme={project.theme} />
          <div className="relative z-10 w-full overflow-hidden">
            
            <section className="min-h-[80svh] pt-32 w-full px-8 md:px-16 flex flex-col justify-end pb-48 relative">
              <RouterLink to="/#work" className={`absolute top-32 left-8 md:left-16 font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 mix-blend-difference`}>
                <FiArrowLeft size={12} /> Exit Room
              </RouterLink>

              <span className={`absolute top-32 right-8 md:right-16 font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-muted)] mix-blend-difference text-right`}>
                Exhibition / {projectIndex + 1}<br/>{project.slug}
              </span>
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,8vw,8rem)] font-heading font-black uppercase leading-[0.9] tracking-tighter text-[var(--color-text-primary)] mix-blend-difference"
              >
                {project.title}
              </motion.h1>
            </section>

            <section className="py-24 w-full px-8 md:px-16 flex items-center justify-end border-t border-[rgba(255,255,255,0.05)]">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2 }}
                className="text-[clamp(1.2rem,2.5vw,2rem)] font-body italic font-light leading-[1.5] text-[var(--color-text-primary)] mix-blend-difference max-w-[30ch] text-right"
              >
                "{project.creative.curatorsNote}"
              </motion.p>
            </section>

            <section className="min-h-[80svh] py-16 w-full flex flex-col items-center justify-center relative px-8 md:px-16">
              <span className={`absolute bottom-8 left-8 md:left-16 font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-muted)] z-40`}>
                Fig 01. Visual Prototype
              </span>
              <div className="w-full relative z-30">
                <Suspense fallback={<div className="h-full w-full flex items-center justify-center opacity-50">Loading simulation...</div>}>
                  <ProjectPageCanvas imagePath={project.thumbnail} />
                </Suspense>
              </div>
            </section>

            {[0, 1, 2].map((i) => {
              if(!project.creative.chapters?.[i] && !project.creative.technicalDecisions?.[i]) return null;
              return (
                <div key={i}>
                  {project.creative.chapters?.[i] && (
                    <ChapterPanel 
                      data={project.creative.chapters[i]} 
                      tTiny="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-accent)]" 
                      tSmall="text-[16px] md:text-[20px] font-body leading-[2] font-medium text-[var(--color-text-primary)] max-w-[35ch]" 
                      index={i} 
                    />
                  )}
                  {project.creative.technicalDecisions?.[i] && (
                    <TechPanel 
                      data={project.creative.technicalDecisions[i]} 
                      tTiny="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-accent)]" 
                      tMedium="text-[clamp(1.2rem,2.5vw,2rem)] font-body italic font-light leading-[1.5] text-[var(--color-text-primary)] mix-blend-difference" 
                      tSmall="text-[16px] md:text-[20px] font-body leading-[2] font-medium text-[var(--color-text-primary)] max-w-[35ch]" 
                      index={i} 
                    />
                  )}
                </div>
              );
            })}

            {(project.liveUrl || project.repoUrl) && (
              <section className="py-20 md:py-32 min-h-[30svh] md:min-h-[40svh] w-full px-8 flex flex-col justify-center items-center bg-[var(--color-accent)] text-[#0a0908] relative overflow-hidden">
                <span className="absolute top-6 md:top-8 left-6 md:left-8 font-mono text-[10px] uppercase tracking-[0.3em] font-bold !text-[#0a0908] opacity-50">
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
                      <span className="text-[clamp(3rem,8vw,8rem)] font-heading font-black uppercase leading-[0.9] tracking-tighter !text-[#0a0908] !mix-blend-normal">Experience</span>
                      <span className="text-[clamp(2rem,6vw,5rem)] text-[#0a0908] opacity-0 -translate-x-12 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center w-full border-b border-[#0a0908] pb-4">
                      <span className="text-[clamp(3rem,8vw,8rem)] font-heading font-black uppercase leading-[0.9] tracking-tighter !text-[#0a0908] !mix-blend-normal">Source Code</span>
                      <span className="text-[clamp(2rem,6vw,5rem)] text-[#0a0908] opacity-0 -translate-x-12 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  )}
                </motion.div>
              </section>
            )}

            <section className="min-h-[25svh] md:min-h-[40svh] w-full px-4 md:px-16 flex flex-col justify-between pt-12 pb-12 md:pt-32 md:pb-24 text-center relative z-20 bg-[var(--color-bg)]">
              <RouterLink to={`/work/${nextProject.slug}`} className="group w-full flex flex-col items-center pt-8 mt-6 md:pt-24 md:mt-16 border-t border-[rgba(255,255,255,0.05)] px-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-4 text-center">
                  Continue to next exhibit
                </span>
                <span className="text-[clamp(2rem,10vw,8rem)] font-heading font-black uppercase leading-[0.9] tracking-tighter group-hover:text-[var(--color-accent)] transition-colors break-words whitespace-normal text-center">
                  {nextProject.title}
                </span>
              </RouterLink>
            </section>
          </div>
        </motion.main>
      ) : (
        // =========================================
        // ENGINEERING MODE
        // =========================================
        <motion.main
          key="engineering"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-24 md:pt-32 max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] pb-24"
          style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '8rem' }}
        >
          <RouterLink to="/#projects" className="inline-flex items-center gap-2 text-[14px] text-black/50 hover:text-black transition-colors mb-12">
            <FiArrowLeft /> Back to Work
          </RouterLink>

          <header className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(3rem,6vw,5rem)] font-heading font-black text-black tracking-tight leading-[1] mb-6">
                {project.title}
              </h1>
              <p className="text-[24px] text-black/70 font-medium leading-relaxed">
                {project.engineering.summary}
              </p>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-4">
               {/* Metrics Panel */}
               <div className="grid grid-cols-3 gap-4 border-t border-black/10 pt-6">
                 <div>
                   <span className="block text-[12px] uppercase font-bold tracking-widest text-black/40 mb-1">Performance</span>
                   <span className="text-[32px] font-mono text-[var(--color-accent)] font-bold">99</span>
                 </div>
                 <div>
                   <span className="block text-[12px] uppercase font-bold tracking-widest text-black/40 mb-1">Accessibility</span>
                   <span className="text-[32px] font-mono text-black font-bold">100</span>
                 </div>
                 <div>
                   <span className="block text-[12px] uppercase font-bold tracking-widest text-black/40 mb-1">Best Practices</span>
                   <span className="text-[32px] font-mono text-black font-bold">100</span>
                 </div>
               </div>
            </div>
          </header>

          <div className="w-full aspect-[21/9] bg-black/5 rounded-2xl overflow-hidden mb-24 border border-black/10">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 text-[16px] leading-relaxed text-black/80">
            {/* Left Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <section>
                <h2 className="text-[13px] font-bold text-black uppercase tracking-wider mb-4 border-b border-black/10 pb-2">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.engineering.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-black/5 text-black/70 rounded-md text-[13px] font-bold border border-black/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-[13px] font-bold text-black uppercase tracking-wider mb-4 border-b border-black/10 pb-2">Architecture Flow</h2>
                <div className="flex flex-col gap-3 font-mono text-[13px]">
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/20"></span> Client Interaction</div>
                  <div className="pl-1 text-black/30">↓</div>
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span> State Mutation</div>
                  <div className="pl-1 text-black/30">↓</div>
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/20"></span> Optimistic UI Update</div>
                  <div className="pl-1 text-black/30">↓</div>
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/80"></span> Background Sync</div>
                </div>
              </section>
              
              <section className="flex flex-col gap-4 mt-8">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-black rounded-xl hover:bg-[var(--color-accent)] transition-colors font-medium group" style={{ color: 'white', padding: '18px 28px' }}>
                    <span style={{ color: 'white' }} className="group-hover:text-black transition-colors text-[16px]">View Live Application</span> 
                    <FiExternalLink style={{ color: 'white' }} size={18} className="group-hover:text-black transition-colors" />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-black/5 rounded-xl border border-black/10 hover:bg-black/10 transition-colors font-medium" style={{ color: 'black', padding: '18px 28px' }}>
                    <span style={{ color: 'black' }} className="text-[16px]">Review Source Code</span>
                    <FiGithub style={{ color: 'black' }} size={18} />
                  </a>
                )}
              </section>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              <section>
                <h2 className="text-[24px] font-heading font-bold text-black mb-6">The Problem</h2>
                <p className="text-[18px] text-black/70 leading-[1.8]">{project.engineering.problem}</p>
              </section>

              <section>
                <h2 className="text-[24px] font-heading font-bold text-black mb-6">The Solution</h2>
                <p className="text-[18px] text-black/70 leading-[1.8] mb-8">{project.engineering.solution}</p>
                <div className="bg-black/5 p-8 rounded-xl border border-black/10">
                  <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-4">Core Architecture</h3>
                  <p className="text-[16px] text-black/80 font-medium leading-[1.8]">{project.engineering.architecture}</p>
                </div>
              </section>

              <section>
                <h2 className="text-[24px] font-heading font-bold text-black mb-6">Technical Challenges & Impact</h2>
                <p className="text-[18px] text-black/70 leading-[1.8] mb-8">{project.engineering.challenges}</p>
                
                <div className="border-l-4 border-[var(--color-accent)] pl-6 py-2 mb-12">
                  <p className="text-[20px] font-medium text-black/90">"{project.engineering.results}"</p>
                </div>

                <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-4">Lessons Learned</h3>
                <p className="text-[16px] text-black/70 leading-[1.8] italic">{project.engineering.lessonsLearned}</p>
              </section>
            </div>
          </div>
          
          <div className="mt-16 pt-8 md:mt-32 md:pt-12 border-t border-black/10">
            <RouterLink to={`/work/${nextProject.slug}`} className="flex flex-col md:flex-row md:justify-between items-start md:items-center group gap-2 md:gap-0">
              <span className="text-[14px] font-mono uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">Next Case Study</span>
              <span className="text-[24px] md:text-[32px] font-heading font-black text-black group-hover:text-[var(--color-accent)] transition-colors break-words whitespace-normal text-left md:text-right max-w-full">
                {nextProject.title} &rarr;
              </span>
            </RouterLink>
          </div>

        </motion.main>
      )}
    </AnimatePresence>
  );
}
