import { motion } from 'framer-motion';

export default function AboutPhilosophy() {
  const statements = [
    {
      title: 'MOTION IS COMMUNICATION.',
      desc: 'Animations are not decorations. They are silent instructions that guide the eye, establish hierarchy, and explain how a digital space works without needing words.'
    },
    {
      title: 'PERFORMANCE IS DESIGN.',
      desc: 'A beautiful interface that stutters is a broken interface. Frame rates and load times are just as vital to the user experience as typography and color palettes.'
    },
    {
      title: 'INTERACTION CREATES EMPATHY.',
      desc: 'When a digital element responds naturally to human touch—with the right physics, resistance, and weight—it stops feeling like software and starts feeling like an extension of the physical world.'
    },
    {
      title: 'SIMPLICITY IS MERCILESS.',
      desc: 'Adding complexity is easy. Editing a design down to its absolute, irreducible essence requires discipline. The hardest engineering challenge is making the final product feel effortless.'
    }
  ];

  return (
    <div className="w-full h-full p-8 md:p-16">
      
      <span className="text-[10px] text-[#c4653a] font-bold font-mono tracking-widest uppercase mb-12 block">
        [ 02 / Philosophy ]
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24 max-w-4xl">
        
        {statements.map((stmt, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-4 relative"
          >
            {/* Subtle architectural marker */}
            <div className="absolute -left-6 top-1.5 w-2 h-[1px] bg-[#c4653a]" />
            
            <h3 className="font-heading font-bold text-[#f5f0eb] text-[16px] tracking-widest uppercase">
              {stmt.title}
            </h3>
            
            <p className="font-body text-[13.5px] text-[#7a7167] leading-relaxed font-medium">
              {stmt.desc}
            </p>
          </motion.div>
        ))}

      </div>

    </div>
  );
}
