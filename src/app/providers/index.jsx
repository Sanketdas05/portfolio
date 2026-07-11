import { LenisProvider } from './LenisProvider';
import { GSAPProvider } from './GSAPProvider';

/**
 * Composes all application-level providers in the correct order.
 * Add new providers here as the project grows.
 */
export function Providers({ children }) {
  return (
    <LenisProvider>
      <GSAPProvider>
        {children}
      </GSAPProvider>
    </LenisProvider>
  );
}
