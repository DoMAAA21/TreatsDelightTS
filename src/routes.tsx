import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router';
//Layouts
import  DashboardLayout from './layouts/dashboardLayout';
import DefaultLayout from './layouts/defaultLayout';
//Views
import LoginPage from './views/auth/login';
import UserPage from './views/admin/owner';
import AddOwnerPage from './views/admin/owner/addOwner';
import EditOwnerPage from './views/admin/owner/editOwner';
import StorePage from './views/admin/store';
import AddStorePage from './views/admin/store/addStore';
import EditStorePage from './views/admin/store/editStore';



const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout/>,
      children: [
        { path: 'owner-all', element: <UserPage /> },
        { path: 'owner-add', element: <AddOwnerPage /> },
        { path: 'owner/:id', element: <EditOwnerPage /> },
        { path: 'store-all', element: <StorePage /> },
        { path: 'store-add', element: <AddStorePage /> },
        { path: 'store/:id', element: <EditStorePage /> },
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

