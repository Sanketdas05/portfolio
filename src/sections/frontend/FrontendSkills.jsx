import { SKILLS } from '../../config/data';

export default function FrontendSkills() {
  return (
    <section id="skills" className="mb-12">
      <h2 className="text-[20px] font-bold text-black mb-6">Skills & Tools</h2>
      <div className="flex flex-col gap-6">
        {SKILLS.map((skillGroup, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
            <h3 className="text-[15px] font-bold text-black w-[150px] flex-shrink-0">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {skillGroup.items.map((item, i) => (
                <span 
                  key={i} 
                  className="text-[15px] text-black/70"
                >
                  {item}{i !== skillGroup.items.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
