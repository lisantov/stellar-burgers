import {
  addIngredient,
  initialState,
  reducer,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './burgerConstructorSlice';
import { describe, test, expect, jest } from '@jest/globals';
import { TConstructorIngredient, TIngredient } from '@utils-types';

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

const mockConstructorIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0945',
    id: '0',
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
    id: '1',
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
    _id: '643d69a5c3f7b9001cfa0941',
    id: '2',
    name: 'Чудесный ингредиент',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

const mockRemovedIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0945',
    id: '0',
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
    id: '1',
    name: 'Чудесный ингредиент',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

const mockMovedUpConstructorIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '0',
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
    _id: '643d69a5c3f7b9001cfa0945',
    id: '1',
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
    id: '2',
    name: 'Чудесный ингредиент',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

const mockMovedDownConstructorIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0945',
    id: '0',
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
    id: '1',
    name: 'Чудесный ингредиент',
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
    _id: '643d69a5c3f7b9001cfa0941',
    id: '2',
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
  }
];

const mockState = {
  burger: {
    bun: mockIngredients[2],
    ingredients: mockConstructorIngredients
  },
  error: null,
  isLoading: false,
  orderData: null
};

describe('Тестирование burgerConstructorSlice', () => {
  describe('Добавлнеие ингредиента работает корректно', () => {
    test('Добавление обычного ингредиента работает корректно', () => {
      const newState = reducer(initialState, addIngredient(mockIngredients[0]));
      const { bun, ingredients } = newState.burger;

      expect(bun).toEqual(null);
      expect(ingredients).toEqual([{ ...mockIngredients[0], id: '0' }]);
    });

    test('Добавление булки работает корректно', () => {
      const newState = reducer(initialState, addIngredient(mockIngredients[2]));
      const { bun, ingredients } = newState.burger;

      expect(bun).toEqual(mockIngredients[2]);
      expect(ingredients).toEqual([]);
    });
  });

  test('Удаление ингредиента работает корректно', () => {
    const newState = reducer(
      mockState,
      removeIngredient(mockConstructorIngredients[1].id)
    );
    const { ingredients } = newState.burger;

    expect(ingredients).toEqual(mockRemovedIngredients);
  });

  describe('Изменение порядка ингредиента работает корректно', () => {
    test('Изменение на порядок вверх работает корректно', () => {
      const newState = reducer(
        mockState,
        moveIngredientUp(mockConstructorIngredients[1].id)
      );
      const { ingredients } = newState.burger;

      expect(ingredients).toEqual(mockMovedUpConstructorIngredients);
    });

    test('Изменение на порядок вниз работает корректно', () => {
      const newState = reducer(
        mockState,
        moveIngredientDown(mockConstructorIngredients[1].id)
      );
      const { ingredients } = newState.burger;

      expect(ingredients).toEqual(mockMovedDownConstructorIngredients);
    });
  });
});
