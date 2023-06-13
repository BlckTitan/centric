import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    promptMessage: ''
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        message: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { message } = messageSlice.actions;

export default messageSlice.reducer;