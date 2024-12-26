import { createSlice } from '@reduxjs/toolkit';

export type HistoryType = {
  id: string;
  timestamp: string;
  query: string;
};

export type HistoryState = {
  history: HistoryType[];
  isLoading: boolean;
};

const initialState: HistoryState = {
  history: [] as HistoryType[],
  isLoading: false,
};

export const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setHistory, setIsLoading } = HistorySlice.actions;
export default HistorySlice.reducer;
