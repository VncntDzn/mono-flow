import { ChildrenProps } from '@/types';
import { Grid } from '@mantine/core';

export const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <Grid overflow="hidden" gutter="none" h="100vh">
      <Grid.Col span={{ base: 12, md: 4 }}>{children}</Grid.Col>
      <Grid.Col
        visibleFrom="md"
        span={8}
        style={{ border: '3px solid yellow' }}
      >
        Image here
      </Grid.Col>
    </Grid>
  );
};
