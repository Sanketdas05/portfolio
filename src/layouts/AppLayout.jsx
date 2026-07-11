import { Outlet, useLocation } from 'react-router';
import { useMode } from '../context/ModeContext';
import Navbar from '../components/ui/Navbar';
import CustomCursor from '../components/ui/CustomCursor';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useEffect } from 'react';

export default function AppLayout() {
  const { isEngineeringMode } = useMode();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isEngineeringMode) {
      document.body.classList.remove('theme-dark');
    }
  }, [isEngineeringMode]);

  return (
    <>
      <CustomCursor />
      <div className="bg-[var(--color-bg)] text-[var(--color-text-primary)] min-h-screen selection:bg-[var(--color-accent-muted)] transition-colors duration-700 ease-in-out">
        <Navbar />
        <ScrollToTop />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
