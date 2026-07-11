import { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [isEngineeringMode, setIsEngineeringMode] = useState(false);

  // Optional: Persist user preference in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-mode');
    if (savedMode === 'engineering') {
      setIsEngineeringMode(true);
    }
  }, []);

  const toggleMode = () => {
    setIsEngineeringMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('portfolio-mode', newMode ? 'engineering' : 'creative');
      return newMode;
    });
  };

  return (
    <ModeContext.Provider value={{ isEngineeringMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
