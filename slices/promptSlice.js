import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: '',
    successMessage: '',
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        displayErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        displaySuccessMessage: (state, action) => {
            state.successMessage = action.payload
        }
    }
})

export const { displayErrorMessage, displaySuccessMessage } = messageSlice.actions;

export default messageSlice.reducer;