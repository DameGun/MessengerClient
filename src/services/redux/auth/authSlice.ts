import { User } from "@customTypes/user";
import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@state/store";
import { DecodedToken } from "@customTypes/authentication";

export interface AuthState {
    user: User | null,
    token: string | null,
}

const initialState: AuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            const { user_id, email } = jwtDecode<DecodedToken>(accessToken);
            state.user = {
                id: user_id,
                userName: email,
                bio: "",
                image: ""
            }
            state.token = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;