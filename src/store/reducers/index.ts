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



const rootReducer = combineReducers({
    auth : authenticationReducer,
    allUsers : allUsersReducer,
    user : userReducer,
    newUser : newUserReducer,
    userDetails : userDetailsReducer,
    allStores : allStoresReducer,
    store : storeReducer,
    newStore : newStoreReducer,
    storeDetails : storeDetailsReducer
})

export default rootReducer;