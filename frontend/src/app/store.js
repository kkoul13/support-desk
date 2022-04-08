import { configureStore } from '@reduxjs/toolkit';
import authReducerrrr from '../features/auth/authSlice'


export const store = configureStore({
  reducer: {
    auth:authReducerrrr      // tree name in chrome
  },
});

