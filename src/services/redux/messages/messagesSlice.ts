import { ChatMessage } from '@customTypes/chatMessage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

interface MessagesState {
  inputBarMode: 'COMMON' | 'EDIT';
  editableMessage?: ChatMessage;
}

const initialState: MessagesState = {
  inputBarMode: 'COMMON',
  editableMessage: undefined,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessageEditMode: (state, action: PayloadAction<ChatMessage>) => {
      state.editableMessage = action.payload;
      state.inputBarMode = 'EDIT';
    },
    resetMessageEditMode: (state) => {
      state.editableMessage = undefined;
      state.inputBarMode = 'COMMON';
    },
  },
});

export const { setMessageEditMode, resetMessageEditMode } = messagesSlice.actions;

export const selectCurrentInputBarMode = (state: RootState) => state.messages.inputBarMode;
export const selectCurrentEditableMessage = (state: RootState) => state.messages.editableMessage;

export default messagesSlice.reducer;
