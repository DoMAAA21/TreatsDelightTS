import { useState } from 'react';

interface NavItem {
  title: string;
  path: string;
}

const defaultNavConfig: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/admin',
  },
  {
    title: 'User',
    path: '/admin/user',
  },
  {
    title: 'stores',
    path: '/admin/stores',
  },

];

export const useNav = () => {
  const [navConfig] = useState<NavItem[]>(defaultNavConfig);

  return { navConfig };
};
