import { Chat } from '@customTypes/chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

export interface ChatsState {
  currentChat?: Chat;
}

const initialState: ChatsState = {
  currentChat: undefined,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatsSlice.actions;

export const selectCurrentChat = (state: RootState) => state.chats.currentChat;

export default chatsSlice.reducer;
