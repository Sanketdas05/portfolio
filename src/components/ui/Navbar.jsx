import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLenisContext } from '../../app/providers/LenisProvider';
import { useMode } from '../../context/ModeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lenisContext = useLenisContext();
  const lenis = lenisContext?.lenis;

  const { isEngineeringMode, toggleMode } = useMode();

  const NAV_LINKS = isEngineeringMode 
    ? [
        { label: 'Work', href: '#projects' },
        { label: 'Contact', href: '#contact' }
      ]
    : [
        { label: 'About', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Contact', href: '#contact' }
      ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  function handleLinkClick(e, href) {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      if (location.pathname !== '/') {
        navigate(`/${href}`);
        return;
      }
      const targetElement = document.querySelector(href);
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: 0 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  return (
    <React.Fragment>
      <header
        className={`fixed top-0 w-full z-[var(--z-nav)] transition-all duration-700 ${
          scrolled 
            ? 'bg-[var(--color-glass)] backdrop-blur-md border-b border-[var(--color-border)] h-16 md:h-20' 
            : 'bg-transparent h-20 md:h-24'
        }`}
      >
        <div 
          className="w-full mx-auto h-full px-[var(--container-padding)] flex items-center justify-between max-w-[var(--container-max)] relative"
          style={{ position: 'relative' }}
        >
          
          <RouterLink 
            to="/" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                if (lenis) {
                  lenis.scrollTo(0, { offset: 0 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
            className="font-body text-[var(--text-sm)] font-bold tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300 block relative z-10"
          >
            Sanket Das
          </RouterLink>

          {/* MODE SWITCHER */}
          <div 
            className="flex items-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full p-1 shadow-sm text-[11px] sm:text-[13px] font-medium absolute w-[140px] sm:w-[200px]"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
          >
            <div className="relative flex w-full">
              <motion.div 
                className="absolute top-0 bottom-0 w-1/2 bg-[var(--color-border)] rounded-full"
                layout
                initial={false}
                animate={{ x: isEngineeringMode ? '100%' : '0%' }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
              
              <button 
                onClick={() => isEngineeringMode && toggleMode()}
                className={`relative flex-1 py-1.5 text-center transition-colors z-10 ${!isEngineeringMode ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
              >
                Creative
              </button>
              
              <button 
                onClick={() => !isEngineeringMode && toggleMode()}
                className={`relative flex-1 py-1.5 text-center transition-colors z-10 ${isEngineeringMode ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
              >
                Build
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-body text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300 relative z-20"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[var(--color-bg-elevated)] z-[90] p-[var(--container-padding)] pt-24 flex flex-col justify-between"
          >
            <nav className="flex flex-col gap-6">
              {/* Mobile Mode Switcher Removed (Moved to top bar) */}

              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-heading text-[var(--text-xl)] font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors block"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
