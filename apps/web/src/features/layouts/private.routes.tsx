import {
  IconCards,
  IconHistory,
  IconLayoutCollage,
  IconUser
} from '@tabler/icons-react';

export interface IRoute {
  icon: React.ReactNode;
  route: string;
  name: string;
}
export const private_routes: IRoute[] = [
  {
    icon: <IconLayoutCollage />,
    route: '/dashboard',
    name: 'Dashboard',
  },
  {
    icon: <IconCards />,
    route: '/budget-tracker',
    name: 'Budge Tracker',
  },
  {
    icon: <IconUser />,
    route: '/profile',
    name: 'Profile',
  },

  {
    icon: <IconHistory />,
    route: '/transactions-history',
    name: 'Transactions History',
  },
];
