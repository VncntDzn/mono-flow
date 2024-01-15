import { ChildrenProps } from '@/types';
import { Container } from '@mantine/core';

export const PublicLayout = ({ children }: ChildrenProps) => {
  return <Container>{children}</Container>;
};
