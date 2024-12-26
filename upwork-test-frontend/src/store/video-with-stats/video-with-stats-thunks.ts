import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentVideo,
  setError,
  setIsLoading,
} from './video-with-stats-slice';
import { instance } from '../../config/axios';

export const getVideoById = createAsyncThunk(
  'video/getVideoById',
  async (videoId: string, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const response = await instance.get(`/video/${videoId}`);

      if (response.data) {
        dispatch(setError(''));
        dispatch(setIsLoading(false));
        dispatch(setCurrentVideo(response.data));
      } else {
        dispatch(setError('No video found'));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      dispatch(setError('An error occurred. Try again later.'));
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);
