import { motion } from 'framer-motion';

const STAGES = [
  {
    year: '2023',
    title: 'The Foundation',
    desc: 'Began studying Computer Science. Discovered the gap between backend logic and human interaction.'
  },
  {
    year: '2024',
    title: 'The Medium',
    desc: 'Transitioned focus to frontend engineering. Mastered React, explored WebGL, and studied motion design principles.'
  },
  {
    year: '2025',
    title: 'The Practice',
    desc: 'Joined KaYa Media as a Frontend Developer. Applied theoretical knowledge to production environments, optimizing rendering pipelines.'
  },
  {
    year: '2026+',
    title: 'The Future',
    desc: 'Building spatial web experiences. Exploring the intersection of AI interfaces, 3D environments, and emotional design.'
  }
];

export default function AboutTimeline() {
  return (
    <div className="w-full h-full p-8 md:p-16 relative">
      
      <span className="text-[10px] text-[#c4653a] font-bold font-mono tracking-widest uppercase mb-12 block">
        [ 06 / Timeline ]
      </span>

      <div className="relative pl-8 max-w-2xl">
        
        {/* The continuous hand-drawn timeline path */}
        <div className="absolute left-[5px] top-2 bottom-4 w-[2px] overflow-hidden">
          <svg width="2" height="100%" preserveAspectRatio="none" className="absolute top-0 left-0">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="#c4653a" strokeWidth="2" strokeDasharray="4 4" className="svg-draw-path" />
          </svg>
        </div>

        <div className="flex flex-col gap-12">
          {STAGES.map((stage, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              {/* Node indicator */}
              <div className="absolute -left-[32px] top-1.5 w-[12px] h-[12px] bg-[#0a0908] border-2 border-[#c4653a] rounded-full z-10" />
              
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-[10px] font-bold text-[#c4653a] bg-[#242220] px-2 py-0.5 rounded-sm">
                  {stage.year}
                </span>
                <h3 className="font-heading font-black text-[#f5f0eb] text-[15px] uppercase tracking-wide">
                  {stage.title}
                </h3>
              </div>
              
              <p className="font-body text-[14px] text-[#b8ad9e] leading-relaxed font-medium">
                {stage.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </div>
  );
}
