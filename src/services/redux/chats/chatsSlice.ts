import { Chat } from "@customTypes/chat";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@state/store";

export interface ChatsState {
    currentChat: Chat | null,
}

const initialState: ChatsState = {
    currentChat: null,
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        }
    }
})

export const { setCurrentChat } = chatsSlice.actions;

export const selectCurrentChat = (state: RootState) => state.chats.currentChat;

export default chatsSlice.reducer;