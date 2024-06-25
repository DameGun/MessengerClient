import { jwtDecode } from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@state/store';
import { DecodedToken } from '@customTypes/authentication';
import { deleteCookie, setCookie } from '@helpers/cookies';

const TOKEN_AGE = import.meta.env.VITE_TOKEN_AGE;

export interface AuthState {
  userId: string | undefined;
  token: string | undefined;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  userId: undefined,
  token: undefined,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      const { userId } = jwtDecode<DecodedToken>(accessToken);

      const oldUserId = localStorage.getItem('userId');
      if (oldUserId !== userId) {
        localStorage.setItem('userId', userId);
      }

      if (refreshToken) {
        setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          'max-age': TOKEN_AGE,
        });
        setCookie('accessToken', accessToken, {
          path: '/',
          secure: true,
          'max-age': 60 * 5,
        });
      }

      state.userId = userId;
      state.token = accessToken;
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.userId = undefined;
      state.token = undefined;
      state.isAuthorized = false;

      deleteCookie('refreshToken');
      deleteCookie('accessToken');

      localStorage.removeItem('userId');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
