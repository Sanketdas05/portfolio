import { EXPERIENCE } from '../../config/data';

export default function FrontendExperience() {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-bold text-black mb-6">Experience</h2>
      <div className="flex flex-col gap-6">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-black leading-snug">
                {exp.company}
              </h3>
              <span className="text-[15px] text-black/70">{exp.role}</span>
            </div>
            <div className="flex flex-col sm:text-right mt-1 sm:mt-0">
              <span className="text-[14px] text-black/50 font-mono tracking-tight">{exp.period}</span>
              <span className="text-[13px] text-black/40">Remote</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
