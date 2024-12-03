import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logoutUserStart: (state) => {
            state.loading = true;
        },
        logoutUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        logoutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { loginFailure, loginStart, loginSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailure } = userSlice.actions;

export default userSlice.reducer;