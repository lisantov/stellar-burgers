import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from '../slices/userSlice/userSlice';
import { ordersSlice } from '../slices/ordersSlice/ordersSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedsSlice } from '../slices/feedSlice/feedSlice';

export const rootReducer = combineSlices(
  userSlice,
  ordersSlice,
  ingredientsSlice,
  burgerConstructorSlice,
  feedsSlice
);
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
