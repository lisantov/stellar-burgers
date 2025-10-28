import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientByIdSelector: (state) => (id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id),
    isLoadingSelector: (state) => state.isLoading,
    bunsSelector: (state) =>
      state.ingredients &&
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    mainSelector: (state) =>
      state.ingredients &&
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    sauceSelector: (state) =>
      state.ingredients &&
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при получении заказов';
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const {
  ingredientsSelector,
  ingredientByIdSelector,
  isLoadingSelector,
  bunsSelector,
  mainSelector,
  sauceSelector
} = ingredientsSlice.selectors;
