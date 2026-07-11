import { FiArrowUpRight } from 'react-icons/fi';

export default function MinimalHeader() {
  return (
    <header className="mb-16">
      <h1 className="text-[28px] font-bold tracking-tight text-black mb-2">
        Sanket Das
      </h1>
      <p className="text-[16px] text-black/70 mb-4 font-medium">
        Frontend Engineer
      </p>
      
      <p className="text-[15px] leading-relaxed text-black/80 mb-6">
        I craft immersive, high-performance web applications bridging the gap between design and engineering. Specializing in React, scalable architectures, and fluid animations.
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px]">
        <a href="https://x.com/sanketdas05" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-black hover:underline decoration-black/20 underline-offset-4">
          X <FiArrowUpRight className="text-black/50" />
        </a>
        <a href="https://linkedin.com/in/sanket-das05" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-black hover:underline decoration-black/20 underline-offset-4">
          LinkedIn <FiArrowUpRight className="text-black/50" />
        </a>
        <a href="https://github.com/Sanketdas05" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-black hover:underline decoration-black/20 underline-offset-4">
          GitHub <FiArrowUpRight className="text-black/50" />
        </a>
        <a href="mailto:sanketdas2005@gmail.com" className="flex items-center gap-1 text-black hover:underline decoration-black/20 underline-offset-4">
          Email <FiArrowUpRight className="text-black/50" />
        </a>
      </div>
    </header>
  );
}
