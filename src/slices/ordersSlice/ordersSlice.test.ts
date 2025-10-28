import { describe, expect, jest, test } from '@jest/globals';
import * as burgerApi from '../../utils/burger-api';
import {
  initialState,
  ordersSelector,
  orderByNumberSelector,
  isLoadingSelector,
  isInitSelector,
  getOrdersThunk,
  reducer
} from './ordersSlice';
import { TOrder } from '@utils-types';

const mockIngredients: string[] = [
  '643d69a5c3f7b9001cfa0945',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa093c'
];

const mockOrders: TOrder[] = [
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
];

const mockInitialState = {
  isInit: false,
  isLoading: false,
  orders: [],
  error: null
};

describe('Тестирование ordersSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const ordersMock = jest
      .spyOn(burgerApi, 'getOrdersApi')
      .mockImplementation(() => Promise.resolve(mockOrders));
  });

  describe('getOrdersThunk обрабатывается корректно', () => {
    test('Вызов getOrdersThunk обрабатывается корректно', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при getOrdersThunk обрабатывается корректно', () => {
      const action = {
        type: getOrdersThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при getOrdersThunk обрабатывается корректно', () => {
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: mockOrders
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
    });
  });

  describe('Селекторы feedSlice работают корректно', () => {
    test('ordersSelector отработал корректно', () => {
      const state = {
        orders: { ...initialState, orders: mockOrders }
      };
      const result = ordersSelector(state);
      expect(result).toEqual(mockOrders);
    });

    test('orderByNumberSelector отработал корректно', () => {
      const state = {
        orders: { ...initialState, orders: mockOrders }
      };
      const result = orderByNumberSelector(state)(1);
      expect(result).toEqual(mockOrders[1]);
    });

    test('isLoadingSelector отработал корректно', () => {
      const state = {
        orders: { ...initialState, orders: mockOrders }
      };
      const result = isLoadingSelector(state);
      expect(result).toEqual(false);
    });

    test('isInitSelector отработал корректно', () => {
      const state = {
        orders: { ...initialState, orders: mockOrders }
      };
      const result = isInitSelector(state);
      expect(result).toEqual(false);
    });
  });
});
