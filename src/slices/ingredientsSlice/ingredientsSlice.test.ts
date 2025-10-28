import {
  reducer,
  getIngredientsThunk,
  initialState,
  ingredientsSelector,
  ingredientByIdSelector,
  isLoadingSelector,
  bunsSelector,
  mainSelector,
  sauceSelector
} from './ingredientsSlice';
import { describe, test, expect, jest } from '@jest/globals';
import * as burgerApi from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

const mockInitialState = {
  isLoading: false,
  ingredients: [],
  error: null
};

describe('Тестирование ingredientsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const ingredientsMock = jest
      .spyOn(burgerApi, 'getIngredientsApi')
      .mockImplementation(() => Promise.resolve(mockIngredients));
  });

  describe('getIngredientsThunk обрабатывается корректно', () => {
    test('Вызов getIngredientsThunk обрабатывается корректно', () => {
      const action = { type: getIngredientsThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при getIngredientsThunk обрабатывается корректно', () => {
      const action = {
        type: getIngredientsThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при getIngredientsThunk обрабатывается корректно', () => {
      const action = {
        type: getIngredientsThunk.fulfilled.type,
        payload: mockIngredients
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });
  });

  describe('Селекторы ingredientsSlice работают корректно', () => {
    test('ingredientsSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState, ingredients: mockIngredients }
      };
      const result = ingredientsSelector(state);
      expect(result).toEqual(mockIngredients);
    });

    test('ingredientByIdSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState, ingredients: mockIngredients }
      };
      const result = ingredientByIdSelector(state)(mockIngredients[2]._id);
      expect(result).toEqual(mockIngredients[2]);
    });

    test('isLoadingSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState }
      };
      const result = isLoadingSelector(state);
      expect(result).toBe(false);
    });

    test('bunsSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState, ingredients: mockIngredients }
      };
      const result = bunsSelector(state);
      expect(result).toEqual([mockIngredients[2]]);
    });

    test('mainSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState, ingredients: mockIngredients }
      };
      const result = mainSelector(state);
      expect(result).toEqual([mockIngredients[1]]);
    });

    test('sauceSelector отработал корректно', () => {
      const state = {
        ingredients: { ...mockInitialState, ingredients: mockIngredients }
      };
      const result = sauceSelector(state);
      expect(result).toEqual([mockIngredients[0]]);
    });
  });
});
