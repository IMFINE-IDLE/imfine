import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import medicalSlice from './slice/medicalSlice';
import userInfoSlice from './slice/userInfoSlice';

const rootReducer = combineReducers({
  medical: medicalSlice.reducer,
  user: userSlice.reducer,
  userInfo: userInfoSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
