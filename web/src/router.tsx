import { Helmet } from 'react-helmet-async';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password.page';
import { AuthLayout } from './features/auth/layouts/auth.layout';
import { Signin } from './features/auth/signin/signin.page';
import { Signup } from './features/auth/signup/signup.page';
import { UnderMaintenance } from './features/error-pages/maintenance.page';
import { NotFound } from './features/error-pages/not-found.page';
import { PrivateLayout } from './features/layouts';
import { Dashboard } from './features/_dashboard/dashboard.page';

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
      {
        path: '/sign-up',
        element: (
          <>
            <Helmet>
              <title>Flow | Sign-up</title>
            </Helmet>
            <AuthLayout>
              <Signup />
            </AuthLayout>
          </>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <>
            <Helmet>
              <title>Flow | Forgot Password</title>
            </Helmet>
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </>
        ),
      },
    ],
  },

  {
    element: <PrivateLayout />,
    errorElement: <UnderMaintenance />,
    children: [
      {
        path: '/dashboard',
        element: (
          <>
            <Helmet>
              <title>Dashboard</title>
            </Helmet>
            <Dashboard />
          </>
        ),
      },
      {
        path: '/user',
        element: (
          <>
            <Helmet>
              <title>User</title>
            </Helmet>
            <>User</>
          </>
        ),
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
