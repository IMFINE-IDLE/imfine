import { combineReducers, configureStore } from '@reduxjs/toolkit';
import medicalSlice from './slice/medicalSlice';

const rootReducer = combineReducers({
  medical: medicalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
