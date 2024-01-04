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
    newEmployee : newEmployeeReducer
})

export default rootReducer;