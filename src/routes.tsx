import { FC } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import DashboardPage from './views/admin/dashboard';

import UserPage from './views/admin/owner';
import AddOwnerPage from './views/admin/owner/addOwner';
import EditOwnerPage from './views/admin/owner/editOwner';
import StorePage from './views/admin/store';
import StoreArchivesPage from './views/admin/store/archives';
import AddStorePage from './views/admin/store/addStore';
import EditStorePage from './views/admin/store/editStore';
import EmployeePage from './views/admin/employee';
import AddEmployeePage from './views/admin/employee/addEmployee';
import EditEmployeePage from './views/admin/employee/editEmployee';
import ProductPage from './views/admin/product';
import AddProductPage from './views/admin/product/addProduct';
import EdiProductPage from './views/admin/product/editProduct';
import MealPage from './views/admin/meal';
import AddMealPage from './views/admin/meal/addMeal';
import EdiMealPage from './views/admin/meal/editMeal';
import RentPage from './views/admin/rent';
import RentTransaction from './views/admin/rent/rentTransactions';
import RentArchivesPage from './views/admin/rent/archives';
import WaterPage from './views/admin/water';
import WaterTransaction from './views/admin/water/waterTransactions';
import WaterArchivesPage from './views/admin/water/archives';
import ElectricityPage from './views/admin/electricity';
import ElectricityTransaction from './views/admin/electricity/electricityTransaction';
import ElectricityArchivesPage from './views/admin/electricity/archives';
import MaintenancePage from './views/admin/maintenance';
import MaintenanceTransaction from './views/admin/maintenance/maintenanceTransactions';
import MaintenanceArchivesPage from './views/admin/maintenance/archives';
import InventoryPage from './views/admin/inventory';
import AnalyticsPage from './views/admin/analytic';
//Client
import LoginPage from './views/auth/login';
import RegisterPage from './views/auth/register';
import ShoppingPage from './views/client/shop';
import ProductDetails from './views/client/shop/productDetails';
import CartPage from './views/client/shop/cart';
import Receipt from './views/client/shop/receipt';

//HomePage
import HomePage from './views/home';





const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="dashboard" /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'owner-all', element: <UserPage /> },
        { path: 'owner-add', element: <AddOwnerPage /> },
        { path: 'owner/:id', element: <EditOwnerPage /> },
        { path: 'store-all', element: <StorePage /> },
        { path: 'store-archived', element: <StoreArchivesPage /> },
        { path: 'store-add', element: <AddStorePage /> },
        { path: 'store/:id', element: <EditStorePage /> },
        { path: 'employee-all', element: <EmployeePage /> },
        { path: 'employee-add', element: <AddEmployeePage /> },
        { path: 'employee/:id', element: <EditEmployeePage /> },
        { path: 'product-all', element: <ProductPage /> },
        { path: 'product-add', element: <AddProductPage /> },
        { path: 'product/:id', element: <EdiProductPage /> },
        { path: 'meal-all', element: <MealPage /> },
        { path: 'meal-add', element: <AddMealPage /> },
        { path: 'meal/:id', element: <EdiMealPage /> },
        { path: 'rent-all', element: <RentPage /> },
        { path: 'rent/store/:id', element: <RentTransaction /> },
        { path: 'rent/store-archived/:id', element: <RentArchivesPage /> },
        { path: 'water-all', element: <WaterPage /> },
        { path: 'water/store/:id', element: <WaterTransaction /> },
        { path: 'water/store-archived/:id', element: <WaterArchivesPage /> },
        { path: 'electricity-all', element: <ElectricityPage /> },
        { path: 'electricity/store/:id', element: <ElectricityTransaction /> },
        { path: 'electricity/store-archived/:id', element: <ElectricityArchivesPage /> },
        { path: 'maintenance-all', element: <MaintenancePage /> },
        { path: 'maintenance/store/:id', element: <MaintenanceTransaction /> },
        { path: 'maintenance/store-archived/:id', element: <MaintenanceArchivesPage /> },
        { path: 'inventory', element: <InventoryPage /> },
        { path: 'analytics', element: <AnalyticsPage /> },
      ]
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <Navigate to="home" /> },
        { path: 'home', element: <HomePage /> },
        { path: 'shop', element: <ShoppingPage /> },
        { path: 'shop/product/:id', element: <ProductDetails /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'receipt', element: <Receipt /> },

      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
  ];



  return useRoutes(routes);
};

export default AppRoutes;

