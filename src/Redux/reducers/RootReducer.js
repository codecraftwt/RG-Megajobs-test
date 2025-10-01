import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Slices/authslice'
import ProfileSlice from '../Slices/ProfileSlice';
import  getPermission  from '../Slices/Permissionslice';



const rootReducer = combineReducers({
  auth:authReducer,
  Profile:ProfileSlice,
  permissions:getPermission
});

export default rootReducer;