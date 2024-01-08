import { useState } from 'react';
import { useAppSelector } from '../../hooks';

interface NavItem {
  title: string;
  path: string;
}

export const useNav = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [navConfig] = useState<NavItem[]>(() => {
    const defaultConfig: NavItem[] = [
      {
        title: 'Dashboard',
        path: '/admin/dashboard',
      },
      {
        title: 'Owners',
        path: '/admin/owner-all',
      },
      {
        title: 'Stores',
        path: '/admin/store-all',
      },
      {
        title: 'Employees',
        path: '/admin/employee-all',
      },
      {
        title: 'Products',
        path: '/admin/product-all',
      },
      {
        title: 'Meals',
        path: '/admin/meal-all',
      },
    ];

    //Role Filtering
    if (user?.role === 'Employee') {
      const filteredNav = ['Employees','Products','Meals'];
      return defaultConfig.filter((item) => filteredNav.includes(item.title));
    }

    if (user?.role === 'Admin') {
      const filteredNav = ['Dashboard','Stores', 'Owners'];
      return defaultConfig.filter((item) => filteredNav.includes(item.title));
    }


    return defaultConfig;
  });

  return { navConfig };
};
