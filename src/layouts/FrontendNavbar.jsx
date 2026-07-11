import { Link as RouterLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

export default function FrontendNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/80 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <RouterLink to="/frontend" className="font-semibold text-[15px] text-zinc-900 tracking-tight flex items-center gap-2">
          <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          Sanket Das
        </RouterLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-zinc-500">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
          <a href="mailto:sanketdas2005@gmail.com" className="hover:text-black transition-colors">Contact</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          <RouterLink to="/" className="text-[13px] font-medium text-zinc-400 hover:text-black transition-colors hidden sm:block">
            Switch to Creative
          </RouterLink>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black hover:bg-zinc-800 text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
          >
            Resume
          </a>
        </div>

      </div>
    </header>
  );
}
