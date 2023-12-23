import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import  DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import UserPage from './views/admin/user';



const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout/>,
      children: [
        { path: 'user', element: <UserPage /> },
      ] 
    },
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        { path: 'user', element: <UserPage /> },
      ] 
    },
  ];

  

  return useRoutes(routes);
};

export default AppRoutes;

