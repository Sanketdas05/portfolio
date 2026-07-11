import { createBrowserRouter } from 'react-router';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/HomePage';
import ProjectPage from '../pages/ProjectPage';

/**
 * Centralized route definitions.
 * The entire application exists under a single root.
 * Mode switching is handled via React Context.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'work/:slug',
        element: <ProjectPage />,
      }
    ],
  }
]);
