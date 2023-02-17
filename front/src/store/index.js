import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import menuSlice from './slice/menuSlice';
import eventSlice from './slice/eventSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  menu: menuSlice.reducer,
  event: eventSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
