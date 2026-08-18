import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import transactionReducer from './transactionSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
});
