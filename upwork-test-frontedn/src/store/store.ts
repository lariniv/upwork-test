import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './video/video-slice';
import historyReducer from './history/history-slice';
import videoWithStatsReducer from './video-with-stats/video-with-stats-slice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
    history: historyReducer,
    videoWithStats: videoWithStatsReducer,
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      video: videoReducer,
      history: historyReducer,
    },
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
