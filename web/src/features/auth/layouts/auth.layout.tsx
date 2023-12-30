import { ChildrenProps } from '@/types';
import { Grid, Image } from '@mantine/core';
import BG from '../assets/bg.jpg';
export const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <Grid overflow="hidden" gutter="none" h="100vh">
      <Grid.Col span={{ base: 12, md: 4 }}>{children}</Grid.Col>
      <Grid.Col visibleFrom="md" span={8}>
        <Image src={BG} h="100vh" />
      </Grid.Col>
    </Grid>
  );
};
