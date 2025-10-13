import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export interface OrdersState {
  isInit: boolean;
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
}

const initialState: OrdersState = {
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
    orderByIdSelector: (state) => (id: string) =>
      state.orders.find((order) => order._id === id),
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
  orderByIdSelector,
  isLoadingSelector,
  isInitSelector
} = ordersSlice.selectors;
