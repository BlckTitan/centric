import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [
        {type: '', quantity: 0}
    ]
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartItem: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {cartItem} = cartSlice.actions;

export default cartSlice.reducer;