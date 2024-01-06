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
    productDetails : productDetailsReducer
})

export default rootReducer;