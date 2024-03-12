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
import PermitPage from './views/admin/permit';
import ContractPage from './views/admin/contract';
import TransactionPage from './views/admin/transactions';
//Client
import LoginPage from './views/auth/login';
import RegisterPage from './views/auth/register';
import ShoppingPage from './views/client/shop';
import ProductDetails from './views/client/shop/productDetails';
import CartPage from './views/client/shop/cart';
import PaymentPage from './views/client/shop/payment';
import Receipt from './views/client/shop/receipt';
import ProfilePage from './views/auth/profile';

//Doctor
import DoctorProductPage from './views/doctor/product';
import DoctorEdiProductPage from './views/doctor/product/editProduct';

//HomePage
import HomePage from './views/home';

//errors
import RestrictedPage from './views/error/restricted';
import NotFoundPage from './views/error/404';
//Protected Route
import ProtectedRoute from './ProtectedRoute'; //allowed roles should be lowercase all

//Mobile gateway
import MobilePaymentPage from './views/mobile/payment';



const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="dashboard" /> },
        { path: 'dashboard', element: <ProtectedRoute allowedRoles={['admin', 'owner', 'employee','doctor']}><DashboardPage /></ProtectedRoute> },
        { path: 'owner-all', element: <ProtectedRoute allowedRoles={['admin']}> <UserPage /></ProtectedRoute> },
        { path: 'owner-add', element: <ProtectedRoute allowedRoles={['admin']}>  <AddOwnerPage />  </ProtectedRoute> },
        { path: 'owner/:id', element: <ProtectedRoute allowedRoles={['admin']}> <EditOwnerPage /> </ProtectedRoute> },
        { path: 'store-all', element: <ProtectedRoute allowedRoles={['admin']}><StorePage /></ProtectedRoute> },
        { path: 'store-archived', element: <ProtectedRoute allowedRoles={['admin']}><StoreArchivesPage /></ProtectedRoute> },
        { path: 'store-add', element: <ProtectedRoute allowedRoles={['admin']}> <AddStorePage /> </ProtectedRoute> },
        { path: 'store/:id', element: <ProtectedRoute allowedRoles={['admin']}><EditStorePage /></ProtectedRoute> },
        { path: 'employee-all', element: <ProtectedRoute allowedRoles={['owner']}><EmployeePage /> </ProtectedRoute> },
        { path: 'employee-add', element: <ProtectedRoute allowedRoles={['owner']}> <AddEmployeePage /></ProtectedRoute> },
        { path: 'employee/:id', element: <ProtectedRoute allowedRoles={['owner']}><EditEmployeePage /> </ProtectedRoute> },
        { path: 'product-all', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><ProductPage /></ProtectedRoute> },
        { path: 'product-add', element: <ProtectedRoute allowedRoles={['owner', 'employee']}> <AddProductPage /></ProtectedRoute> },
        { path: 'product/:id', element: <ProtectedRoute allowedRoles={['owner', 'employee']}> <EdiProductPage /> </ProtectedRoute> },
        { path: 'meal-all', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><MealPage /> </ProtectedRoute> },
        { path: 'meal-add', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><AddMealPage /></ProtectedRoute> },
        { path: 'meal/:id', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><EdiMealPage /> </ProtectedRoute> },
        { path: 'rent-all', element: <ProtectedRoute allowedRoles={['admin']}><RentPage /></ProtectedRoute> },
        { path: 'rent/store/:id', element: <ProtectedRoute allowedRoles={['admin']}><RentTransaction /></ProtectedRoute> },
        { path: 'rent/store-archived/:id', element: <ProtectedRoute allowedRoles={['admin']}><RentArchivesPage /></ProtectedRoute> },
        { path: 'water-all', element: <ProtectedRoute allowedRoles={['admin']}><WaterPage /></ProtectedRoute> },
        { path: 'water/store/:id', element: <ProtectedRoute allowedRoles={['admin']}><WaterTransaction /></ProtectedRoute> },
        { path: 'water/store-archived/:id', element: <ProtectedRoute allowedRoles={['admin']}><WaterArchivesPage /></ProtectedRoute> },
        { path: 'electricity-all', element: <ProtectedRoute allowedRoles={['admin']}><ElectricityPage /></ProtectedRoute> },
        { path: 'electricity/store/:id', element: <ProtectedRoute allowedRoles={['admin']}><ElectricityTransaction /></ProtectedRoute> },
        { path: 'electricity/store-archived/:id', element: <ProtectedRoute allowedRoles={['admin']}><ElectricityArchivesPage /></ProtectedRoute> },
        { path: 'maintenance-all', element: <ProtectedRoute allowedRoles={['admin']}><MaintenancePage /></ProtectedRoute> },
        { path: 'maintenance/store/:id', element: <ProtectedRoute allowedRoles={['admin']}><MaintenanceTransaction /></ProtectedRoute> },
        { path: 'maintenance/store-archived/:id', element: <ProtectedRoute allowedRoles={['admin']}><MaintenanceArchivesPage /></ProtectedRoute> },
        { path: 'inventory', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><InventoryPage /></ProtectedRoute> },
        { path: 'analytics', element: <ProtectedRoute allowedRoles={['admin', 'owner', 'employee']}><AnalyticsPage /></ProtectedRoute> },
        { path: 'permits', element: <ProtectedRoute allowedRoles={['admin']}> <PermitPage /> </ProtectedRoute> },
        { path: 'contracts', element: <ProtectedRoute allowedRoles={['admin']}><ContractPage /></ProtectedRoute> },
        { path: 'transactions', element: <ProtectedRoute allowedRoles={['owner', 'employee']}><TransactionPage /></ProtectedRoute> },
      ]
    }, {
      path: '/doctor',
      element: <DashboardLayout />,
      children: [
        { path: 'product-all', element: <ProtectedRoute allowedRoles={['doctor']}><DoctorProductPage /></ProtectedRoute> },
        { path: 'product/:id', element: <ProtectedRoute allowedRoles={['doctor']}> <DoctorEdiProductPage /> </ProtectedRoute> },
      ],
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
        { path: 'payment', element: <PaymentPage /> },
        { path: 'receipt', element: <Receipt /> },
        { path: 'me', element: <ProfilePage /> },

      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/restricted', element: <RestrictedPage /> },
    { path: '/mobile-payment', element: <MobilePaymentPage /> },
    { path: '*', element: <NotFoundPage /> },

  ];



  return useRoutes(routes);
};

export default AppRoutes;

