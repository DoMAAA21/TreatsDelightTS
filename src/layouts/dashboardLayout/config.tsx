import { useState } from 'react';

interface NavItem {
  title: string;
  path: string;
}

const defaultNavConfig: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
  },
  {
    title: 'Owners',
    path: '/admin/owner-all',
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
