import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        displayMessage: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { displayMessage } = messageSlice.actions;

export default messageSlice.reducer;