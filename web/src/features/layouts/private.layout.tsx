import { BottomNavigation, NavbarDesktop } from '@/common';
import { Avatar, Box, Card, Container, Flex, Grid, Paper } from '@mantine/core';
import { memo } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import className from './private.layout.module.css';
import { IRoute, private_routes } from './private.routes';

export const PrivateLayout = memo(() => {
  const location = useLocation();
  const access_token = localStorage.getItem('access_token');

  if (!access_token) return <Navigate to="/sign-in" replace />;

  return (
    <Card component={Container} withBorder shadow="xl" p={0} bg="#efefef">
      <Grid gutter={0} columns={12} overflow="hidden">
        <Grid.Col
          span={{ xs: 0, md: 3, lg: 1 }}
          component="aside"
          visibleFrom="lg"
          h="100vh"
          p={0}
          m={0}
        >
          <Paper h="100%">
            <Box py="lg">
              <Avatar
                tabIndex={1}
                title="Avatar"
                color="cyan"
                radius="xl"
                size="md"
                py="lg"
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: '1px solid red',
                  margin: 'auto',
                  paddingTop: '2rem',
                }}
              >
                VD
              </Avatar>
            </Box>
            {private_routes.map(({ route, name, icon }: IRoute) => (
              <Flex
                aria-label={name}
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
                {icon}
              </Flex>
            ))}
          </Paper>
        </Grid.Col>
        <Grid.Col
          span={{ xs: 12, md: 9, lg: 'auto' }}
          component="main"
          display="flex"
          style={{ flexDirection: 'column' }}
          p={0}
          m={0}
        >
          <Box p="sm">
            <NavbarDesktop />
            <Paper p="sm" my="sm" bg="white">
              <Outlet />
            </Paper>
            <BottomNavigation routes={private_routes} />
          </Box>
        </Grid.Col>
      </Grid>
    </Card>
  );
});
