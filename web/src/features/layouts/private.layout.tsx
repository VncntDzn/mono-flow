import { ChildrenProps } from '@/types';
import { Container } from '@mantine/core';
import { Navigate } from 'react-router-dom';

export const PrivateLayout = ({ children }: ChildrenProps) => {
  if (false) {
    return <Navigate to="/" replace />;
  }
  return <Container>{children}</Container>;
};
