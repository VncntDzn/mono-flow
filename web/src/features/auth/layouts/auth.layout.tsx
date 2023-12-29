import { ChildrenProps } from '@/types';
import { Flex } from '@mantine/core';

export const AuthLayout = ({ children }: ChildrenProps) => {
  return <Flex>{children}</Flex>;
};
