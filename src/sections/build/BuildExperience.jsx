import { EXPERIENCE } from '../../config/data';

export default function BuildExperience() {
  return (
    <section style={{ marginBottom: '16rem' }}>
      <h3 className="text-[14px] font-mono tracking-widest uppercase text-black/50 mb-12 border-b border-black/10 pb-4">
        Experience
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-8 md:col-start-5">
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-[20px] md:text-[24px] font-medium leading-[1.2] tracking-tight text-black">
                KaYa Media, Frontend Developer
              </h4>
              <span className="font-mono text-[12px] uppercase tracking-widest text-black/40">
                Aug 2025 — Oct 2025
              </span>
            </div>

            <p className="text-[18px] md:text-[20px] leading-[1.6] text-black/80 max-w-3xl">
              As a Frontend Developer at KaYa Media, I engineered responsive web interfaces and advanced 3D experiences. I focused on translating complex UI/UX designs into pixel-perfect applications, utilizing GSAP and Three.js to create smooth, professional interactions. My work prioritized performance optimization through code splitting and efficient rendering techniques, ensuring cross-browser compatibility and mobile responsiveness.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
