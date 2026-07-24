import { motion } from 'framer-motion';

export default function AboutNow() {
  return (
    <div className="w-full min-h-screen py-32 flex flex-col justify-center items-center px-[var(--container-padding)] relative text-[#f5f0eb] overflow-hidden">
      
      {/* Stark Horizon Line Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#7a7167] to-transparent opacity-30 mt-32" />
      </div>

      {/* Chapter Marker */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 06 / The Future ]
        </span>
      </div>

      {/* Unfinished Sketch Artifact (Light outline for dark mode) */}
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 pointer-events-none opacity-30">
        <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
          {/* Wireframe box that trails off */}
          <path d="M 10,10 L 150,15 M 10,10 L 15,100 M 150,15 L 145,105 M 15,100 L 145,105" stroke="#f5f0eb" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 20,20 L 140,25 M 20,20 L 25,90 M 140,25 L 135,95" stroke="#f5f0eb" strokeWidth="0.5" />
          
          {/* Scribbles trailing off */}
          <path d="M 150,105 Q 180,110 200,150 T 240,180" stroke="#f5f0eb" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M 140,100 Q 160,130 190,140" stroke="#f5f0eb" strokeWidth="0.5" strokeDasharray="2 4" />
          
          <text x="20" y="140" fill="#f5f0eb" fontSize="12" fontFamily="monospace" transform="rotate(-5)">TODO: Define state...</text>
        </svg>
      </div>

      <div className="max-w-5xl w-full flex flex-col items-center justify-center relative z-10 text-center min-h-[50vh]">
        
        {/* The Final realization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <p className="font-heading font-medium text-[#7a7167] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] tracking-tight">
            I'm still learning.
          </p>
          <p className="font-heading font-medium text-[#c4653a] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
            That's the exciting part.
          </p>
        </motion.div>

      </div>

      {/* End Indicator */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex items-center gap-4 opacity-40 z-10">
        <div className="w-4 h-4 rounded-full border-2 border-[#f5f0eb]" />
      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          FIELD NOTE 06
          Current exploration and
          future trajectory.
        </pre>
      </div>

    </div>
  );
}
