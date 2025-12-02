import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contactReducer from './slices/contactSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
