import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../config/axios';
import {
  setError,
  setIsLoading,
  setLastQuery,
  setNextPageToken,
  setPrevPageToken,
  setVideos,
} from './video-slice';

export const getVideosByQuery = createAsyncThunk(
  'video/getVideosByQuery',
  async (
    { query, pageToken }: { query: string; pageToken: string | null },
    { dispatch }
  ) => {
    try {
      dispatch(setIsLoading(true));

      const params = pageToken ? { q: query, pageToken } : { q: query };

      const response = await instance.get('/search', {
        params,
      });

      if (response.data.results && !pageToken) {
        dispatch(setError(''));
        dispatch(setIsLoading(false));
        dispatch(setLastQuery(query));
        dispatch(setNextPageToken(response.data.nextPageToken));
        dispatch(setPrevPageToken(response.data.prevPageToken));
        dispatch(setVideos(response.data.results));
      } else {
        dispatch(setError('No videos found'));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      dispatch(setError('An error occurred. Try again later.'));
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);
