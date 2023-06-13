import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import messageReducer from '../slices/promptSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    promptMessage: messageReducer 
  },
})