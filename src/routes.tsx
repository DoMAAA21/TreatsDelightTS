import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import  DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import DashboardPage from './views/admin/dashboard';
import LoginPage from './views/auth/login';
import UserPage from './views/admin/owner';
import AddOwnerPage from './views/admin/owner/addOwner';
import EditOwnerPage from './views/admin/owner/editOwner';
import StorePage from './views/admin/store';
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
//Client
import ShoppingPage from './views/client/shop';
import ProductDetails from './views/client/shop/productDetails';





const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout/>,
      children: [
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'owner-all', element: <UserPage /> },
        { path: 'owner-add', element: <AddOwnerPage /> },
        { path: 'owner/:id', element: <EditOwnerPage /> },
        { path: 'store-all', element: <StorePage /> },
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
      ] 
    },
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        { path: 'shop', element: <ShoppingPage /> },
        { path: 'shop/product/:id', element: <ProductDetails/> },
      ] 
    },
    { path: '/login',element: <LoginPage/>},
  ];

  

  return useRoutes(routes);
};

export default AppRoutes;

