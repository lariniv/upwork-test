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

export type VideoState = {
  videos: VideoType[];
  currentVideo: VideoTypeWithStats | null;
  lastQuery: string;
  prevPageToken: string | null;
  nextPageToken: string | null;
  state: {
    loading: boolean;
    error: string;
  };
};

const initialState: VideoState = {
  videos: [] as VideoType[],
  currentVideo: null,
  lastQuery: '',
  prevPageToken: null,
  nextPageToken: null,
  state: {
    loading: false,
    error: '',
  },
};

export const VideoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.state.loading = action.payload;
    },
    setError: (state, action) => {
      state.state.error = action.payload;
    },
    setLastQuery: (state, action) => {
      state.lastQuery = action.payload;
    },
    setPrevPageToken: (state, action) => {
      state.prevPageToken = action.payload;
    },
    setNextPageToken: (state, action) => {
      state.nextPageToken = action.payload;
    },
  },
});

export const {
  setVideos,
  setIsLoading,
  setError,
  setLastQuery,
  setPrevPageToken,
  setNextPageToken,
  setCurrentVideo,
} = VideoSlice.actions;
export default VideoSlice.reducer;
