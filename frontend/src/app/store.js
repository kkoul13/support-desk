import { configureStore } from '@reduxjs/toolkit';
import authReducerrrr from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice';
import noteReducer from '../features/notes/noteSlice'



export const store = configureStore({
  reducer: {
    auth:authReducerrrr,
    tickets:ticketReducer,
    notes: noteReducer
  },
});

