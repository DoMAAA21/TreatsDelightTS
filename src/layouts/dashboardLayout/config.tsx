import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import DashboardIcon from '../../components/icons/DashboardIcon';
import StoreIcon from '../../components/icons/StoreIcon';
import OwnerIcon from '../../components/icons/OwnerIcon';
import ProductIcon from '../../components/icons/ProductIcon';
import MealIcon from '../../components/icons/MealIcon';
import EmployeeIcon from '../../components/icons/EmployeeIcon';

interface NavItem {
  title: string;
  path: string;
  defaultIcon?:  string | React.ReactNode;
  activeIcon?:  string | React.ReactNode;
}

export const useNav = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [navConfig] = useState<NavItem[]>(() => {
    const defaultConfig: NavItem[] = [
      {
        title: 'Dashboard',
        path: '/admin/dashboard',
        defaultIcon: <DashboardIcon color="#000" />,
        activeIcon: <DashboardIcon color="#fff" />
      },
      {
        title: 'Owners',
        path: '/admin/owner-all',
        defaultIcon: <OwnerIcon color="#000" />,
        activeIcon: <OwnerIcon color="#fff" />
      },
      {
        title: 'Stores',
        path: '/admin/store-all',
        defaultIcon: <StoreIcon color="#000" />,
        activeIcon: <StoreIcon color="#fff" />
      },
      {
        title: 'Employees',
        path: '/admin/employee-all',
        defaultIcon: <EmployeeIcon color="#000" />,
        activeIcon: <EmployeeIcon color="#fff" />
      },
      {
        title: 'Products',
        path: '/admin/product-all',
        defaultIcon: <ProductIcon color="#000" />,
        activeIcon: <ProductIcon color="#fff" />
      },
      {
        title: 'Meals',
        path: '/admin/meal-all',
        defaultIcon: <MealIcon color="#000" />,
        activeIcon: <MealIcon color="#fff" />

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
