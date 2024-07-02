import { DEFAULT_SIDEBAR_WIDTH } from '@constants/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

export interface DomValuesState {
  sidebarWidth: number;
}

const initialState: DomValuesState = {
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,
};

const domValuesSlice = createSlice({
  name: 'domValues',
  initialState,
  reducers: {
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload;
    },
  },
});

export const { setSidebarWidth } = domValuesSlice.actions;

export const selectSidebarWidth = (state: RootState) => state.domValues.sidebarWidth;

export default domValuesSlice.reducer;
