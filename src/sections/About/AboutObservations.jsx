import { motion } from 'framer-motion';

export default function AboutObservations() {
  return (
    <div className="w-full min-h-[120vh] py-24 md:py-32 flex flex-col justify-start items-center px-[var(--container-padding)] relative bg-[var(--color-bg-deep)] text-[#f5f0eb] overflow-hidden border-t border-[rgba(245,240,235,0.05)]">
      
      {/* Chapter Marker — in flow with clear spacing above quotes */}
      <div className="w-full max-w-5xl mb-8 md:mb-12 relative z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 05 / Observations ]
        </span>
      </div>

      <div className="max-w-5xl w-full flex flex-col relative z-10 gap-24 md:gap-48 lg:gap-64">
        
        {/* Note 1: Left */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 text-left pl-8 md:pl-16"
        >
          <p className="font-mono text-[11px] md:text-[13px] text-[#7a7167] leading-[1.8] tracking-wider uppercase">
            Users don't notice smooth easing.<br/>
            <span className="text-[#c4653a]">They notice when it feels wrong.</span>
          </p>
        </motion.div>

        {/* Note 2: Right */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 self-end text-right pr-8 md:pr-16"
        >
          <p className="font-mono text-[11px] md:text-[13px] text-[#7a7167] leading-[1.8] tracking-wider uppercase">
            Good interactions don't ask for attention.<br/>
            <span className="text-[#f5f0eb]">They earn it.</span>
          </p>
        </motion.div>

        {/* Note 3: Center */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center pb-32"
        >
          <p className="font-mono text-[11px] md:text-[13px] text-[#7a7167] leading-[1.8] tracking-wider uppercase">
            Every deleted feature<br/>
            <span className="text-[#c4653a]">made the product better.</span>
          </p>
        </motion.div>

      </div>

      {/* Museum Annotation */}
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-40">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          MARGIN NOTES
          Field reflections collected 
          during development.
        </pre>
      </div>

    </div>
  );
}
