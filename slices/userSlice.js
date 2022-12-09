import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        // the payload is an object that we pass along with the action
        login: (state, action) =>  {
            state.user = action.payload;
        },
        logout: (state) => {
        // Whenever we logout, we set USER back to null
            state.user = null;

        },
    }
});

export const { login, logout } = userSlice.actions;

// Selector
export const selectUser = (state) => state.user.user;


export default userSlice.reducer;