import { FiArrowLeft, FiMapPin, FiLink, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router';

export default function TwitterProfileHeader() {
  return (
    <div className="flex flex-col bg-white">
      
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center px-4 py-2 gap-6 cursor-pointer hover:bg-zinc-50 transition-colors">
        <RouterLink to="/" className="w-9 h-9 rounded-full hover:bg-zinc-200 flex items-center justify-center transition-colors">
          <FiArrowLeft className="w-5 h-5 text-black" />
        </RouterLink>
        <div className="flex flex-col">
          <h1 className="text-[20px] font-bold text-black leading-tight">Sanket Das</h1>
          <span className="text-[13px] text-zinc-500">Frontend Engineer</span>
        </div>
      </div>

      {/* Banner / Cover Image */}
      <div className="w-full h-[150px] sm:h-[200px] bg-blue-500 relative">
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay"></div>
      </div>

      {/* Profile Info Section */}
      <div className="px-4 relative">
        
        {/* Avatar & Action Button */}
        <div className="flex justify-between items-start mb-3">
          <div className="w-[110px] h-[110px] sm:w-[134px] sm:h-[134px] rounded-full border-4 border-white bg-zinc-200 -mt-[15%] relative overflow-hidden">
            {/* Replace with actual image */}
            <img src="/images/avatar.jpg" alt="Sanket Das" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <a 
            href="mailto:sanketdas2005@gmail.com"
            className="mt-3 px-4 py-1.5 border border-zinc-300 rounded-full font-bold text-[15px] hover:bg-zinc-100 transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Name & Bio */}
        <div className="flex flex-col mb-3">
          <h2 className="text-[20px] font-extrabold text-black leading-tight">Sanket Das</h2>
          <span className="text-[15px] text-zinc-500">@sanketdas05</span>
        </div>

        <div className="text-[15px] text-black leading-snug mb-3">
          Building high-performance frontend architecture. Specializing in scalable React applications, accessibility, and product-focused user interfaces. 
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px] text-zinc-500 mb-4">
          <div className="flex items-center gap-1.5">
            <FiBriefcase className="w-[18px] h-[18px]" />
            <span>Open to opportunities</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiMapPin className="w-[18px] h-[18px]" />
            <span>India</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiLink className="w-[18px] h-[18px]" />
            <a href="https://github.com/Sanketdas05" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">github.com/Sanketdas05</a>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-[18px] h-[18px]" />
            <span>Joined Web Dev 2021</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5 text-[15px] mb-4">
          <div className="flex gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-black">8</span>
            <span className="text-zinc-500">Projects</span>
          </div>
          <div className="flex gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-black">100%</span>
            <span className="text-zinc-500">Lighthouse Score</span>
          </div>
        </div>

      </div>

    </div>
  );
}
