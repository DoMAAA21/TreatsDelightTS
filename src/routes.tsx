import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import  DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import LoginPage from './views/auth/login';
import UserPage from './views/admin/user';
import AddUserPage from './views/admin/user/addUser';



const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout/>,
      children: [
        { path: 'owner-all', element: <UserPage /> },
        { path: 'owner-add', element: <AddUserPage /> },
      ] 
    },
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        { path: 'user', element: <UserPage /> },
      ] 
    },
    { path: '/login',element: <LoginPage/>},
  ];

  

  return useRoutes(routes);
};

export default AppRoutes;

