import { Navigate, Outlet } from 'react-router-dom';

export const PrivateLayout = () => {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) return <Navigate to="/sign-in" replace />;
  return <Outlet />;
};
