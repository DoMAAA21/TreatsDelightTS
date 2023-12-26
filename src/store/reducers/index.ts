import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducer from './auth/authenticationSlice';

const rootReducer = combineReducers({
    auth : authenticationReducer,
    auth2 : authenticationReducer
})

export default rootReducer;