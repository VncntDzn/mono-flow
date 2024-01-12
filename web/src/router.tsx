import { Helmet } from 'react-helmet-async';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password.page';
import { AuthLayout } from './features/auth/layouts/auth.layout';
import { Signin } from './features/auth/signin/signin.page';
import { Signup } from './features/auth/signup/signup.page';
import { UnderMaintenance } from './features/error-pages/maintenance.page';
import { NotFound } from './features/error-pages/not-found.page';
import { PrivateLayout } from './features/layouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <UnderMaintenance />,
    children: [
      {
        path: '/',
        element: <>landing page</>,
      },
      {
        path: '/sign-in',
        element: (
          <>
            <Helmet>
              <title>Flow | Sign-in</title>
            </Helmet>
            <AuthLayout>
              <Signin />
            </AuthLayout>
          </>
        ),
      },
    ],
  },

  {
    path: '/app',
    element: <PrivateLayout />,
    errorElement: <UnderMaintenance />,
    children: [
      {
        path: '/app/dashboard',
        element: <h1>Dashboardxxxx</h1>,
      },
      {
        path: '/app/user',
        element: <h1>Userr</h1>,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
