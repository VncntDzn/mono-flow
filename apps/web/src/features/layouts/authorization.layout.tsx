import { ChildrenProps } from '@/types';
import { Box } from '@mantine/core';
import { Navigate } from 'react-router-dom';

interface AuthorizationLayoutProps extends ChildrenProps {
  allowedRoles: string[];
}
// This layout checks whether certain user is allowed to view content
export const AuthorizationLayout = ({
  children,
  allowedRoles,
}: AuthorizationLayoutProps) => {
  const user = 'ADMIN';

  if (!allowedRoles.includes(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Box>{children}</Box>;
};
