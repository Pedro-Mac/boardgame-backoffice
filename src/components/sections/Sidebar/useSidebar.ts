import { Gamepad, Home, User } from 'lucide-react';

export const useSidebar = () => {
  const sidebarItems = [
    {
      title: 'Home',
      url: '/home',
      icon: Home,
    },
    {
      title: 'Games',
      url: '/games',
      icon: Gamepad,
    },
    {
      title: 'Users',
      url: '/users',
      icon: User,
    },
  ];

  return {
    sidebarItems,
  };
};
