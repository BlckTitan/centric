import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import messageReducer from '../slices/promptSlice';
import shippingFormReducer from '../slices/formSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    promptMessage: messageReducer,
    shippingForm: shippingFormReducer
  },
})