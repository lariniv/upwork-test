import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../config/axios';
import { setHistory, setIsLoading } from './history-slice';

export const getHistory = createAsyncThunk(
  'history/getHistory',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const response = await instance.get('/history');

      if (!response.data) {
        dispatch(setIsLoading(false));
        return { history: [] };
      }

      dispatch(setIsLoading(false));
      dispatch(setHistory(response.data));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);
