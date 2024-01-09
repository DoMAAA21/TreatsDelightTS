import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import BlankLogo from '../../assets/icons/openAi.svg';
import DashboardLogo from '../../assets/icons/dashboard.svg';
import OwnerLogo from '../../assets/icons/owner.svg';
import StoreLogo from '../../assets/icons/store.svg';
import EmployeeLogo from '../../assets/icons/employees.svg';
import MealLogo from '../../assets/icons/meal.svg';
import ProductLogo from '../../assets/icons/product.svg';

interface NavItem {
  title: string;
  path: string;
  icon?:  string ;
}

export const useNav = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [navConfig] = useState<NavItem[]>(() => {
    const defaultConfig: NavItem[] = [
      {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: DashboardLogo
      },
      {
        title: 'Owners',
        path: '/admin/owner-all',
        icon: OwnerLogo
      },
      {
        title: 'Stores',
        path: '/admin/store-all',
        icon: StoreLogo
      },
      {
        title: 'Employees',
        path: '/admin/employee-all',
        icon: EmployeeLogo
      },
      {
        title: 'Products',
        path: '/admin/product-all',
        icon: ProductLogo
      },
      {
        title: 'Meals',
        path: '/admin/meal-all',
        icon: MealLogo
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
