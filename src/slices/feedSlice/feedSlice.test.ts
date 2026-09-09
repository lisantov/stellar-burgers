import { describe, expect, jest, test } from '@jest/globals';
import * as burgerApi from '../../utils/burger-api';
import {
  initialState,
  getFeedsThunk,
  feedsSelector,
  feedByNumberSelector,
  totalFeedsSelector,
  todayFeedsSelector,
  isLoadingSelector,
  isInitSelector,
  reducer
} from './feedSlice';

const mockIngredients: string[] = [
  '643d69a5c3f7b9001cfa0945',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa093c'
];

const mockFeeds = {
  orders: [
    {
      _id: '0',
      status: '',
      name: 'Заказ 1',
      createdAt: '28.10.2025',
      updatedAt: '28.10.2025',
      number: 0,
      ingredients: mockIngredients
    },
    {
      _id: '1',
      status: '',
      name: 'Заказ 2',
      createdAt: '28.10.2025',
      updatedAt: '28.10.2025',
      number: 1,
      ingredients: mockIngredients
    },
    {
      _id: '2',
      status: '',
      name: 'Заказ 3',
      createdAt: '27.10.2025',
      updatedAt: '27.10.2025',
      number: 2,
      ingredients: mockIngredients
    }
  ],
  total: 3,
  totalToday: 2,
  success: true
};

const mockInitialState = {
  isInit: false,
  isLoading: false,
  feeds: [],
  totalFeeds: 0,
  todayFeeds: 0,
  error: null
};

describe('Тестирование feedSlice', () => {
  describe('getFeedsThunk обрабатывается корректно', () => {
    test('Вызов getFeedsThunk обрабатывается корректно', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при getFeedsThunk обрабатывается корректно', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при getFeedsThunk обрабатывается корректно', () => {
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: mockFeeds
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.feeds).toEqual(mockFeeds.orders);
      expect(state.totalFeeds).toEqual(mockFeeds.total);
      expect(state.todayFeeds).toEqual(mockFeeds.totalToday);
    });
  });

  describe('Селекторы feedSlice работают корректно', () => {
    test('feedsSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, feeds: mockFeeds.orders }
      };
      const result = feedsSelector(state);
      expect(result).toEqual(mockFeeds.orders);
    });

    test('feedByNumberSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, feeds: mockFeeds.orders }
      };
      const result = feedByNumberSelector(state)(1);
      expect(result).toEqual(mockFeeds.orders[1]);
    });

    test('totalFeedsSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, feeds: mockFeeds.orders, totalFeeds: 3 }
      };
      const result = totalFeedsSelector(state);
      expect(result).toBe(3);
    });

    test('todayFeedsSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, feeds: mockFeeds.orders, todayFeeds: 2 }
      };
      const result = todayFeedsSelector(state);
      expect(result).toBe(2);
    });

    test('isLoadingSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, ingredients: mockIngredients }
      };
      const result = isLoadingSelector(state);
      expect(result).toEqual(false);
    });

    test('isInitSelector отработал корректно', () => {
      const state = {
        feeds: { ...initialState, ingredients: mockIngredients }
      };
      const result = isInitSelector(state);
      expect(result).toEqual(false);
    });
  });
});
