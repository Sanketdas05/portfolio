import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { Providers } from './providers';
import { router } from './router';
import CustomCursor from '../components/ui/CustomCursor';
import Preloader from '../components/ui/Preloader';

/**
 * Root application component.
 * Wraps the router with all providers.
 */
export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <Providers>
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
      <CustomCursor />
      <RouterProvider router={router} />
    </Providers>
  );
}
