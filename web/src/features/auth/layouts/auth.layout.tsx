import { ChildrenProps } from '@/types';
import { Grid } from '@mantine/core';

export const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <Grid overflow="hidden" h="100vh">
      <Grid.Col span={4}>{children}</Grid.Col>
      <Grid.Col visibleFrom="md" span={8}>
        Image here
      </Grid.Col>
    </Grid>
  );
};
