import { ChildrenProps } from '@/types';
import { Container } from '@mantine/core';
import { Navigate } from 'react-router-dom';

export const PrivateLayout = ({ children }: ChildrenProps) => {
  if (true) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Container>{children}</Container>;
};
