import { EDUCATION } from '../../config/data';

export default function FrontendEducation() {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-bold text-black mb-6">Education</h2>
      <div className="flex flex-col gap-6">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-black leading-snug">
                {edu.institution}
              </h3>
              <span className="text-[15px] text-black/70">{edu.degree}</span>
            </div>
            <div className="flex flex-col sm:text-right mt-1 sm:mt-0">
              <span className="text-[14px] text-black/50 font-mono tracking-tight">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
