import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducer from './auth/authenticationSlice';
import allUsersReducer from './user/allUsersSlice';
import userReducer from './user/userSlice';
import newUserReducer from './user/newUserSlice';

const rootReducer = combineReducers({
    auth : authenticationReducer,
    allUsers : allUsersReducer,
    user : userReducer,
    newUser : newUserReducer
})

export default rootReducer;