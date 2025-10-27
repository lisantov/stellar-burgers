import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken, { expires: 300 });
    return data.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken, { expires: 300 });
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (registerData: Partial<TRegisterData>) => {
    const data = await updateUserApi(registerData);
    return data.user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () => {
  const success = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return success;
});

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  selectors: {
    isInitSelector: (state) => state.isInit,
    isLoadingSelector: (state) => state.isLoading,
    userSelector: (state) => state.user,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // ВХОД ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при авторизации';
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.isInit = true;
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      // РЕГИСТРАЦИЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при регистрации';
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.isInit = true;
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      // ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isInit = true;
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      // ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при обновлении пользователя';
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.isInit = true;
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      // ВЫХОД ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при выходе';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isInit = true;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      });
  }
});

export const { init } = userSlice.actions;
export const {
  isInitSelector,
  isLoadingSelector,
  userSelector,
  errorSelector
} = userSlice.selectors;
