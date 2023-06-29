import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shipping: [],
    payment: []
}

export const shippingFormSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        getShipping: (state, action) => {
            state.shipping = action.payload
        },
        getPayment: (state, action) => {
            state.payment = action.payload
        }
    }
})

export const {getPayment, getShipping} = shippingFormSlice.actions;

export default shippingFormSlice.reducer;