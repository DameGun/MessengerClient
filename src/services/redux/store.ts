import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@services/api";
import authReducer from '@state/auth/authSlice'
import chatsReducer from '@state/chats/chatsSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        chats: chatsReducer
    },
    middleware: getDefaulMiddleware => 
        getDefaulMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch