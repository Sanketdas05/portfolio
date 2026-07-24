import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    title: 'Question',
    content: 'Why are we building this? I never start with code. I start by poking holes in the brief until only the absolutely necessary features remain.',
    rotation: -2,
  },
  {
    title: 'Experiment',
    content: "I build ugly, functional proofs of concept. Can we push 10,000 particles at 60fps? Let's find out before we design the UI.",
    rotation: 3,
  },
  {
    title: 'Delete',
    content: "The most important phase. I aggressively cut features, animations, and code that doesn't serve the core interaction.",
    rotation: -1,
  },
  {
    title: 'Repeat',
    content: 'Iterate until it breaks. Then fix it. Iteration is where the actual design happens.',
    rotation: 2,
  },
  {
    title: 'Polish',
    content: 'The final 10% takes 90% of the time. Easing curves, memory leaks, bundle sizes. Perfection is in the invisible details.',
    rotation: -3,
  }
];

export default function AboutProcess() {
  return (
    <div className="w-full relative py-32 pb-48 md:py-48 md:pb-64 flex flex-col items-center bg-[var(--color-bg)]">

      {/* Drafting Table Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="drafting-lines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#f5f0eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#drafting-lines)" />
        </svg>
      </div>

      {/* Chapter Marker */}
      <div className="w-full max-w-7xl px-[var(--container-padding)] mb-32 md:mb-48 relative z-10">
        <span className="text-[10px] text-[var(--color-accent)] font-bold font-mono tracking-widest uppercase block">
          [ 04 / Process ]
        </span>
      </div>

      {/* Authentic Artifact: Sticky Note — hidden on mobile so it doesn't overlay cards */}
      <motion.img
        src="/images/artifacts/sticky_note.png"
        alt="Authentic Sticky Note"
        className="hidden md:block absolute top-[30%] right-[15%] w-48 opacity-70 mix-blend-screen pointer-events-none -rotate-12 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      {/* Cards wrapper — on mobile, single column; on desktop, wrap into rows */}
      <div className="w-full max-w-7xl px-[var(--container-padding)] relative z-10 flex flex-col md:flex-wrap md:flex-row md:justify-center gap-12 md:gap-16 lg:gap-32 mt-16">
        {PROCESS_STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: step.rotation }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: idx * 0.1 }}
            className="relative bg-[#161412] w-full md:w-auto md:max-w-[320px] shadow-2xl p-8 flex flex-col gap-6 flex-shrink-0"
            style={{
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)'
            }}
          >
            {/* Masking Tape */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[rgba(245,240,235,0.05)] backdrop-blur-md"
              style={{
                rotate: `${idx % 2 === 0 ? -3 : 2}deg`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                border: '1px solid rgba(245,240,235,0.02)'
              }}
            />

            <div className="mt-4 flex flex-col gap-4">
              <span className="font-mono text-[10px] text-[#c4653a] uppercase tracking-widest font-bold">
                Step 0{idx + 1}
              </span>
              <h2 className="font-heading font-black text-[#f5f0eb] text-[2rem] uppercase tracking-tighter leading-none">
                {step.title}
              </h2>
              <p className="font-body text-[14px] text-[#b8ad9e] leading-[1.8] font-medium">
                {step.content}
              </p>
            </div>

            {/* Subtle pencil marks/scribbles */}
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="absolute bottom-4 right-4 opacity-30">
              <path d="M5 15 Q 15 5, 25 15 T 35 5" stroke="#f5f0eb" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 2" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Museum Annotation — static in flow on mobile, absolute on desktop */}
      <div className="relative z-10 w-full max-w-7xl px-[var(--container-padding)] pt-16 pb-4 opacity-60 md:hidden">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          FIELD NOTE 03
          Documented process workflow
          for creative development.
        </pre>
      </div>
      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 z-10 opacity-60 hidden md:block">
        <pre className="font-mono text-[9px] uppercase tracking-widest text-[#7a7167] leading-[1.6]">
          FIELD NOTE 03
          Documented process workflow
          for creative development.
        </pre>
      </div>

    </div>
  );
}
