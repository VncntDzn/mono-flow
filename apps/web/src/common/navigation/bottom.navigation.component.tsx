import { IRoute } from '@/features/layouts/private.routes';
import { Box, Flex, Group, Paper } from '@mantine/core';
import { Link } from 'react-router-dom';

interface Props {
  routes: IRoute[];
}
export const BottomNavigation = ({ routes }: Props) => {
  return (
    <Paper p="sm" hiddenFrom='lg' component={Group} justify="space-evenly" align="center">
      {routes.map(({ route, name, icon }) => (
        <Flex justify="center" component={Link} to={route} key={name} gap="sm">
          <Box>{icon}</Box>
        </Flex>
      ))}
    </Paper>
  );
};
