import { IconDashboard, IconUser } from '@tabler/icons-react';

export interface IRoute {
  icon: React.ReactNode;
  route: string;
  name: string;
}
export const private_routes: IRoute[] = [
  {
    icon: <IconDashboard />,
    route: '/dashboard',
    name: 'Dashboard',
  },
  {
    icon: <IconUser />,
    route: '/profile',
    name: 'Profile',
  },
  {
    icon: <IconUser />,
    route: '/profile-1',
    name: 'Profile',
  },
  {
    icon: <IconUser />,
    route: '/profile-2',
    name: 'Profile',
  },
];
