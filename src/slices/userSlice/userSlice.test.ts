import { describe, expect, jest, test } from '@jest/globals';
import * as burgerApi from '../../utils/burger-api';
import {
  initialState,
  init,
  registerUserThunk,
  loginUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutUserThunk,
  isInitSelector,
  isLoadingSelector,
  userSelector,
  errorSelector,
  reducer
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'mock@mail.ru',
  name: 'mockUser'
};

const mockInitialState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

describe('Тестирование userSlice', () => {
  describe('registerUserThunk обрабатывается корректно', () => {
    test('Вызов registerUserThunk обрабатывается корректно', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при registerUserThunk обрабатывается корректно', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при registerUserThunk обрабатывается корректно', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('loginUserThunk обрабатывается корректно', () => {
    test('Вызов loginUserThunk обрабатывается корректно', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при loginUserThunk обрабатывается корректно', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при loginUserThunk обрабатывается корректно', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('getUserThunk обрабатывается корректно', () => {
    test('Вызов getUserThunk обрабатывается корректно', () => {
      const action = { type: getUserThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при getUserThunk обрабатывается корректно', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при getUserThunk обрабатывается корректно', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('updateUserThunk обрабатывается корректно', () => {
    test('Вызов updateUserThunk обрабатывается корректно', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при updateUserThunk обрабатывается корректно', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при updateUserThunk обрабатывается корректно', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('logoutUserThunk обрабатывается корректно', () => {
    test('Вызов logoutUserThunk обрабатывается корректно', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Ошибка при logoutUserThunk обрабатывается корректно', () => {
      const action = {
        type: logoutUserThunk.rejected.type,
        error: {
          message: 'Ошибка запроса'
        }
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Ошибка запроса');
    });

    test('Успех при logoutUserThunk обрабатывается корректно', () => {
      const action = {
        type: logoutUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(mockInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
    });
  });

  describe('Селекторы userSlice работают корректно', () => {
    test('userSelector отработал корректно', () => {
      const state = {
        user: { ...initialState, user: mockUser }
      };
      const result = userSelector(state);
      expect(result).toEqual(mockUser);
    });

    test('errorSelector отработал корректно', () => {
      const state = {
        user: { ...initialState, user: mockUser }
      };
      const result = errorSelector(state);
      expect(result).toBeNull();
    });

    test('isLoadingSelector отработал корректно', () => {
      const state = {
        user: { ...initialState, user: mockUser }
      };
      const result = isLoadingSelector(state);
      expect(result).toEqual(false);
    });

    test('isInitSelector отработал корректно', () => {
      const state = {
        user: { ...initialState, user: mockUser }
      };
      const result = isInitSelector(state);
      expect(result).toEqual(false);
    });
  });
});
