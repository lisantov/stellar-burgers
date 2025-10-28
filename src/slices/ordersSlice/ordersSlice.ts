import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  getOrdersApi
);

export interface OrdersState {
  isInit: boolean;
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
}

export const initialState: OrdersState = {
  isInit: false,
  isLoading: false,
  orders: [],
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    orderByNumberSelector: (state) => (number: number) =>
      state.orders.find((order) => order.number === number),
    isLoadingSelector: (state) => state.isLoading,
    isInitSelector: (state) => state.isInit
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.error = action.error.message || 'Ошибка при получении заказов';
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.error = null;
        state.orders = action.payload;
      });
  }
});

export const {
  ordersSelector,
  orderByNumberSelector,
  isLoadingSelector,
  isInitSelector
} = ordersSlice.selectors;

export const reducer = ordersSlice.reducer;
