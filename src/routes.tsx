import { FC } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import DashboardPage from './views/admin/dashboard';
import LoginPage from './views/auth/login';
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
//Client
import ShoppingPage from './views/client/shop';
import ProductDetails from './views/client/shop/productDetails';
import CartPage from './views/client/shop/cart';

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

      ]
    },
    { path: '/login', element: <LoginPage /> },
  ];



  return useRoutes(routes);
};

export default AppRoutes;

