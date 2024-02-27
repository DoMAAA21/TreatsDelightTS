import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from './auth/authenticationSlice';
import allUsersReducer from './user/allUsersSlice';
import userReducer from './user/userSlice';
import newUserReducer from './user/newUserSlice';
import userDetailsReducer from './user/userDetailsSlice';
import allStoresReducer from './store/allStoressSlice';
import storeReducer from './store/storeSlice';
import newStoreReducer from './store/newStoreSlice';
import storeDetailsReducer from './store/storeDetailsSlice';
import allEmployeesReducer from './employee/allEmployeesSlice';
import employeeReducer from './employee/employeeSlice';
import newEmployeeReducer from './employee/newEmployeeSlice';
import employeeDetailsReducer from './employee/employeeDetailsSlice';
import allProductsReducer from './product/allProductsSlice';
import productReducer from './product/productSlice';
import newProductReducer from './product/newProductSlice';
import productDetailsReducer from './product/productDetailsSlice';
import cartReducer from './cart/cartSlice';
import allRentsReducer from './rent/allRentsSlice';
import newRentReducer from './rent/newRentSlice';
import rentReducer from './rent/rentSlice';
import allWatersReducer from './water/allWatersSlice';
import newWaterReducer from './water/newWaterSlice';
import waterReducer from './water/waterSlice';
import allElectricityReducer from './electricity/allElectricitySlice';
import newElectricityReducer from './electricity/newElectricitySlice';
import electricityReducer from './electricity/electricitySlice';
import allMaintenanceReducer from './maintenance/allMaintenanceSlice';
import newMaintenanceReducer from './maintenance/newMaintenanceSlice';
import maintenanceReducer from './maintenance/maintenanceSlice';
import electricityBillsPerMonthReducer from './analytic/electricBillsPerMonthSlice';
import waterBillsPerMonthReducer from './analytic/waterBillsPerMonthSlice';
import rentBillsPerMonthReducer from './analytic/rentBillsPerMonthSlice';
import productsSoldReducer from './analytic/productsSoldSlice';
import topStoresReducer from './analytic/topStoresSlice';
import salesReducer from './analytic/salesSlice';


const rootReducer = combineReducers({
    auth : authenticationReducer,
    allUsers : allUsersReducer,
    user : userReducer,
    newUser : newUserReducer,
    userDetails : userDetailsReducer,
    allStores : allStoresReducer,
    store : storeReducer,
    newStore : newStoreReducer,
    storeDetails : storeDetailsReducer,
    allEmployees : allEmployeesReducer,
    employee : employeeReducer,
    newEmployee : newEmployeeReducer,
    employeeDetails : employeeDetailsReducer,
    allProducts : allProductsReducer,
    product : productReducer,
    newProduct : newProductReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    allRent : allRentsReducer,
    newRent : newRentReducer,
    rent : rentReducer,
    allWater : allWatersReducer,
    newWater : newWaterReducer,
    water : waterReducer,
    allElectricity : allElectricityReducer,
    newElectricity : newElectricityReducer,
    electricity : electricityReducer,
    electricityBill : electricityBillsPerMonthReducer,
    waterBill : waterBillsPerMonthReducer,
    rentBill : rentBillsPerMonthReducer,
    productsSold : productsSoldReducer,
    allMaintenance : allMaintenanceReducer,
    newMaintenance : newMaintenanceReducer,
    maintenance : maintenanceReducer,
    topStores : topStoresReducer,
    sales : salesReducer,
})

export default rootReducer;