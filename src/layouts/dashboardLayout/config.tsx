import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import DashboardIcon from '../../components/icons/DashboardIcon';
import AnalyticsIcon from '../../components/icons/AnalyticsIcon';
import StoreIcon from '../../components/icons/StoreIcon';
import OwnerIcon from '../../components/icons/OwnerIcon';
import ProductIcon from '../../components/icons/ProductIcon';
import MealIcon from '../../components/icons/MealIcon';
import EmployeeIcon from '../../components/icons/EmployeeIcon';
import RentIcon from '../../components/icons/RentIcon';
import WaterIcon from '../../components/icons/WaterIcon';
import ElectricityIcon from '../../components/icons/ElectricityIcon';
import MaintenanceIcon from '../../components/icons/MaintenanceIcon';
import InventoryIcon from '../../components/icons/InventoryIcon';

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
        title: 'Analytics',
        path: '/admin/analytics',
        defaultIcon: <AnalyticsIcon color="#000" />,
        activeIcon: <AnalyticsIcon color="#fff" />
      },
      {
        title: 'Stores',
        path: '/admin/store-all',
        defaultIcon: <StoreIcon color="#000" />,
        activeIcon: <StoreIcon color="#fff" />
      },
      {
        title: 'Owners',
        path: '/admin/owner-all',
        defaultIcon: <OwnerIcon color="#000" />,
        activeIcon: <OwnerIcon color="#fff" />
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
      {
        title: 'Rent',
        path: '/admin/rent-all',
        defaultIcon: <RentIcon color="#000" />,
        activeIcon: <RentIcon color="#fff" />
      },
      {
        title: 'Water',
        path: '/admin/water-all',
        defaultIcon: <WaterIcon color="#000" />,
        activeIcon: <WaterIcon color="#fff" />
      },
      {
        title: 'Electricity',
        path: '/admin/electricity-all',
        defaultIcon: <ElectricityIcon color="#000" />,
        activeIcon: <ElectricityIcon color="#fff" />
      },
      {
        title: 'Maintenance',
        path: '/admin/maintenance-all',
        defaultIcon: <MaintenanceIcon color="#000" />,
        activeIcon: <MaintenanceIcon color="#fff" />
      },
      {
        title: 'Inventory',
        path: '/admin/inventory',
        defaultIcon: <InventoryIcon color="#000" />,
        activeIcon: <InventoryIcon color="#fff" />
      },
    ];

    //Role Filtering
    if (user?.role === 'Employee') {
      const filteredNav = ['Dashboard','Analytics','Products','Meals','Inventory'];
      return defaultConfig.filter((item) => filteredNav.includes(item.title));
    }
    
    if (user?.role === 'Owner') {
      const filteredNav = ['Dashboard','Analytics','Employees','Products','Meals','Inventory'];
      return defaultConfig.filter((item) => filteredNav.includes(item.title));
    }

    if (user?.role === 'Admin') {
      const filteredNav = ['Dashboard','Stores', 'Owners','Rent','Water','Electricity','Maintenance'];
      return defaultConfig.filter((item) => filteredNav.includes(item.title));
    }


    return defaultConfig;
  });

  return { navConfig };
};
