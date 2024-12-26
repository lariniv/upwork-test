import { createSlice } from '@reduxjs/toolkit';

export type VideoType = {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export type VideoTypeWithStats = VideoType & {
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

export type VideoWithStatsState = {
  currentVideo: VideoTypeWithStats | null;
  state: {
    loading: boolean;
    error: string;
  };
};

const initialState: VideoWithStatsState = {
  currentVideo: null,
  state: {
    loading: false,
    error: '',
  },
};

export const VideoWithStatsSlice = createSlice({
  name: 'fullVideo',
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.state.loading = action.payload;
    },
    setError: (state, action) => {
      state.state.error = action.payload;
    },
  },
});

export const { setIsLoading, setError, setCurrentVideo } =
  VideoWithStatsSlice.actions;
export default VideoWithStatsSlice.reducer;
