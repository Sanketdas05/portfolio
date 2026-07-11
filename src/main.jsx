import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { LenisProvider } from './app/providers/LenisProvider';
import { ModeProvider } from './context/ModeContext';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import './styles/fonts.css';
import './styles/index.css';

function MainApp() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <LenisProvider>
      <ModeProvider>
        {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
        <CustomCursor />
        <RouterProvider router={router} />
      </ModeProvider>
    </LenisProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
