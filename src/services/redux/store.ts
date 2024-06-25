import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@state/api';
import authReducer from '@state/auth/authSlice';
import chatsReducer from '@state/chats/chatsSlice';
import messagesReducer from '@state/messages/messagesSlice';
import domValuesReducer from '@state/domValues/domValuesSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    domValues: domValuesReducer,
  },
  middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
