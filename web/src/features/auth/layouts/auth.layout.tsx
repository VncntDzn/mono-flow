import { ChildrenProps } from '@/types';
import { Grid } from '@mantine/core';

export const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <Grid overflow="hidden" h="100vh">
      <Grid.Col span={{ base: 12, md: 4 }} h="100vh">
        {children}
      </Grid.Col>
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
