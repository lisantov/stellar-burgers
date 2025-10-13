import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'burger/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export interface BurgerConstructorState {
  burger: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
  isLoading: boolean;
  orderData: TOrder | null;
}

const initialState: BurgerConstructorState = {
  burger: {
    bun: null,
    ingredients: []
  },
  error: null,
  isLoading: false,
  orderData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.burger.bun = action.payload;
      } else {
        const newIngredient = {
          ...action.payload,
          id: String(state.burger.ingredients.length)
        };
        state.burger.ingredients.push(newIngredient);
      }
    },
    clearOrderData: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    burgerSelector: (state) => state.burger,
    errorSelector: (state) => state.error,
    isLoadingSelector: (state) => state.isLoading,
    orderDataSelector: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при получении заказов';
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.burger = initialState.burger;
        state.error = null;
        state.orderData = action.payload.order;
      });
  }
});

export const {
  burgerSelector,
  errorSelector,
  isLoadingSelector,
  orderDataSelector
} = burgerConstructorSlice.selectors;

export const { addIngredient, clearOrderData } = burgerConstructorSlice.actions;
