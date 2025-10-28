import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice/userSlice';
import { ordersSlice } from '../slices/ordersSlice/ordersSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedsSlice } from '../slices/feedSlice/feedSlice';

describe('Тестирование хранилища store', () => {
  beforeAll(() => {
    jest.mock('../utils/burger-api', () => ({
      getUserApi: jest.fn(),
      loginUserApi: jest.fn(),
      logoutApi: jest.fn(),
      registerUserApi: jest.fn(),
      updateUserApi: jest.fn(),
      getOrdersApi: jest.fn(),
      getIngredientsApi: jest.fn(),
      orderBurgerApi: jest.fn(),
      getFeedsApi: jest.fn()
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('rootReducer инициализируется корректно', () => {
    const rootReducer = combineSlices(
      userSlice,
      ordersSlice,
      ingredientsSlice,
      burgerConstructorSlice,
      feedsSlice
    );

    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feeds');

    expect(state.user).toEqual(userSlice.getInitialState());
    expect(state.orders).toEqual(ordersSlice.getInitialState());
    expect(state.ingredients).toEqual(ingredientsSlice.getInitialState());
    expect(state.burgerConstructor).toEqual(
      burgerConstructorSlice.getInitialState()
    );
    expect(state.feeds).toEqual(feedsSlice.getInitialState());
  });
});
