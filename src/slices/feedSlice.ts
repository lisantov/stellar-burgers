import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export interface FeedsState {
  isInit: boolean;
  isLoading: boolean;
  feeds: TOrder[];
  totalFeeds: number;
  todayFeeds: number;
  error: string | null;
}

const initialState: FeedsState = {
  isInit: false,
  isLoading: false,
  feeds: [],
  totalFeeds: 0,
  todayFeeds: 0,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state.feeds,
    feedByNumberSelector: (state) => (num: number) =>
      state.feeds.find((feed) => feed.number === num),
    totalFeedsSelector: (state) => state.totalFeeds,
    todayFeedsSelector: (state) => state.todayFeeds,
    isLoadingSelector: (state) => state.isLoading,
    isInitSelector: (state) => state.isInit
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.error = action.error.message || 'Ошибка при получении заказов';
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.error = null;
        state.feeds = action.payload.orders;
        state.totalFeeds = action.payload.total;
        state.todayFeeds = action.payload.totalToday;
      });
  }
});

export const {
  feedsSelector,
  feedByNumberSelector,
  totalFeedsSelector,
  todayFeedsSelector,
  isLoadingSelector,
  isInitSelector
} = feedsSlice.selectors;
