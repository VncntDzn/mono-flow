import { Outlet, createBrowserRouter } from 'react-router-dom';
import { UnderMaintenance } from './features/error-pages/maintenance.page';
import { Signin } from './features/auth/signin/signin.page';
import { Signup } from './features/auth/signup/signup.page';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password.page';
import { NotFound } from './features/error-pages/not-found.page';
import { Dashboard } from './features/_dashboard/dashboard.page';

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <>Landing Page</>,
    errorElement: <UnderMaintenance />,
  },
  {
    path: '/',
    element: <Outlet />,
    errorElement: <UnderMaintenance />,
    children: [
      {
        path: 'sign-in',
        element: <Signin />,
      },
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
