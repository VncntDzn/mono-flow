import { BottomNavigation, NavbarDesktop } from '@/common';
import { Box, Card, Container, Flex, Grid, Paper, Text } from '@mantine/core';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import className from './private.layout.module.css';
import { IRoute, private_routes } from './private.routes';
import { memo } from 'react';

export const PrivateLayout = memo(() => {
  const location = useLocation();
  const access_token = localStorage.getItem('access_token');

  if (!access_token) return <Navigate to="/sign-in" replace />;

  return (
    <Card component={Container} p={0} withBorder shadow="md">
      <Grid columns={12} overflow="hidden" gutter="sm">
        <Grid.Col
          span={{ xs: 0, md: 3, lg: 3 }}
          component="aside"
          visibleFrom="lg"
          h="100vh"
        >
          <Paper withBorder h="100%">
            {private_routes.map(({ route, name, icon }: IRoute) => (
              <Flex
                className={className.li}
                justify="center"
                component={Link}
                to={route}
                key={name}
                gap="sm"
                style={{
                  borderLeft:
                    location.pathname === route ? '3px solid black' : 'none',
                }}
              >
                <Box>{icon}</Box>
                <Text w="5rem">{name}</Text>
              </Flex>
            ))}
          </Paper>
        </Grid.Col>
        <Grid.Col
          span={{ xs: 12, md: 9, lg: 9 }}
          component="main"
          display="flex"
          style={{ flexDirection: 'column' }}
        >
          <NavbarDesktop />
          <Paper my="sm" p="sm">
            <Outlet />
          </Paper>
          <BottomNavigation routes={private_routes} />
        </Grid.Col>
      </Grid>
    </Card>
  );
});
