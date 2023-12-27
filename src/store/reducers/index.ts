import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducer from './auth/authenticationSlice';
import allUsersReducer from './user/allUsersSlice';

const rootReducer = combineReducers({
    auth : authenticationReducer,
    allUsers : allUsersReducer
})

export default rootReducer;