import { Chat } from "@customTypes/chat";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatsState {
    chats: Chat[],
    currentChat: Chat | null
}

const initialState: ChatsState = {
    chats: [],
    currentChat: null
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        }
    }
})

export const { setChats } = chatsSlice.actions;

export default chatsSlice.reducer;