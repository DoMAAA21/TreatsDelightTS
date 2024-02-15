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
        title: 'Order',
        path: '/shop',

      }, 
      // {
      //   title: 'Cart',
      //   path: '/cart',

      // }, 
    ];
    return defaultConfig;
  });

  return { navConfig };
};
