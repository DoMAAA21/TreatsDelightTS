import { useState } from 'react';

interface NavItem {
  title: string;
  path: string;
}

export const useNav = () => {
  const [navConfig] = useState<NavItem[]>(() => {
    const defaultConfig: NavItem[] = [
      {
        title: 'Home',
        path: '/home',
       
      },
      {
        title: 'Shop',
        path: '/shop',

      }, 
    ];
    return defaultConfig;
  });

  return { navConfig };
};
