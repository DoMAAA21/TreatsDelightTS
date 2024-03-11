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
import PermitIcon from '../../components/icons/PermitIcon';
import ContractIcon from '../../components/icons/ContractIcon';
import TransactionIcon from '../../components/icons/TransactionIcon';


interface NavItem {
  title: string;
  path: string;
  id: string;
  defaultIcon?:  string | React.ReactNode;
  activeIcon?:  string | React.ReactNode;
}

export const useNav = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [navConfig] = useState<NavItem[]>(() => {
    const defaultConfig: NavItem[] = [
      {
        title: 'Dashboard',
        id: 'dashboard',
        path: '/admin/dashboard',
        defaultIcon: <DashboardIcon color="#000" />,
        activeIcon: <DashboardIcon color="#fff" />
      },
      {
        title: 'Analytics',
        id: 'analytics',
        path: '/admin/analytics',
        defaultIcon: <AnalyticsIcon color="#000" />,
        activeIcon: <AnalyticsIcon color="#fff" />
      },
      {
        title: 'Stores',
        id: 'stores',
        path: '/admin/store-all',
        defaultIcon: <StoreIcon color="#000" />,
        activeIcon: <StoreIcon color="#fff" />
      },
      {
        title: 'Owners',
        id: 'owners',
        path: '/admin/owner-all',
        defaultIcon: <OwnerIcon color="#000" />,
        activeIcon: <OwnerIcon color="#fff" />
      },   
      {
        title: 'Employees',
        id: 'employees',
        path: '/admin/employee-all',
        defaultIcon: <EmployeeIcon color="#000" />,
        activeIcon: <EmployeeIcon color="#fff" />
      },
      {
        title: 'Products',
        id: 'products',
        path: '/admin/product-all',
        defaultIcon: <ProductIcon color="#000" />,
        activeIcon: <ProductIcon color="#fff" />
      },
      {
        title: 'Meals',
        id: 'meals',
        path: '/admin/meal-all',
        defaultIcon: <MealIcon color="#000" />,
        activeIcon: <MealIcon color="#fff" />

      },
      {
        title: 'Rent',
        id: 'rent',
        path: '/admin/rent-all',
        defaultIcon: <RentIcon color="#000" />,
        activeIcon: <RentIcon color="#fff" />
      },
      {
        title: 'Water',
        id: 'water',
        path: '/admin/water-all',
        defaultIcon: <WaterIcon color="#000" />,
        activeIcon: <WaterIcon color="#fff" />
      },
      {
        title: 'Electricity',
        id: 'electricity',
        path: '/admin/electricity-all',
        defaultIcon: <ElectricityIcon color="#000" />,
        activeIcon: <ElectricityIcon color="#fff" />
      },
      {
        title: 'Maintenance',
        id: 'maintenance',
        path: '/admin/maintenance-all',
        defaultIcon: <MaintenanceIcon color="#000" />,
        activeIcon: <MaintenanceIcon color="#fff" />
      },
      {
        title: 'Permits',
        id: 'permits',
        path: '/admin/permits',
        defaultIcon: <PermitIcon color="#000" />,
        activeIcon: <PermitIcon color="#fff" />
      },
      {
        title: 'Contracts',
        id: 'contracts',
        path: '/admin/contracts',
        defaultIcon: <ContractIcon color="#000" />,
        activeIcon: <ContractIcon color="#fff" />
      },
      {
        title: 'Inventory',
        id: 'inventory',
        path: '/admin/inventory',
        defaultIcon: <InventoryIcon color="#000" />,
        activeIcon: <InventoryIcon color="#fff" />
      },
      {
        title: 'Transactions',
        id: 'transactions',
        path: '/admin/transactions',
        defaultIcon: <TransactionIcon color="#000" />,
        activeIcon: <TransactionIcon color="#fff" />
      },
      {
        title: 'All Products',
        id: 'doctor-products',
        path: '/doctor/product-all',
        defaultIcon: <ProductIcon color="#000" />,
        activeIcon: <ProductIcon color="#fff" />
      },

    ];

    //Role Filtering
    if (user?.role === 'Employee') {
      const filteredNav = ['Dashboard','Analytics','Products','Meals','Inventory','Transactions'];
      return defaultConfig.filter((item) => filteredNav.includes(item.id));
    }
    
    if (user?.role === 'Owner') {
      const filteredNav = ['dashboard','analytics','employees','products','meals','inventory','transactions'];
      return defaultConfig.filter((item) => filteredNav.includes(item.id));
    }

    if (user?.role === 'Admin') {
      const filteredNav = ['dashboard','stores', 'owners','rent','water','electricity','maintenance','permits','contracts'];
      return defaultConfig.filter((item) => filteredNav.includes(item.id));
    }

    if (user?.role.toLowerCase() === 'doctor') {
      const filteredNav = ['doctor-products'];
      return defaultConfig.filter((item) => filteredNav.includes(item.id));
    }


    return defaultConfig;
  });

  return { navConfig };
};
