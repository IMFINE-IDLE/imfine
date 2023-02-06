import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';
import instance from '../../api/instance';
import { getCookie, setCookie } from '../../utils/cookie';

export const setClientHeaders = (token) => {
  axios.interceptors.request.use(function (config) {
    config.withCredentials = true;
    config.headers.Authorization = token;
    return config;
  });
};

// axios.defaults.headers.common['Authorization'] = getCookie('accessToken');

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.user.signUp(), userData, {
        withCredentials: true,
      });
      console.log(res.data);
      const accessToken = res.data.data.accessToken;

      // 쿠키 세팅 테스트
      setCookie('accessToken', accessToken, {
        path: '/',
        // httpOnly: true,
        // secure: true,
      });

      // axios.defaults.headers.common['Authorization'] = getCookie('accessToken');

      // axios interceptor
      setClientHeaders(accessToken);

      const saveData = {
        uid: userData.uid,
        accessToken: accessToken,
        // refreshToken: refreshToken,
      };

      localStorage.setItem('uid', userData.uid);

      const JWT_EXPIRATION_TIME = 0.5 * 3600 * 1000;
      setInterval(logOut, JWT_EXPIRATION_TIME);

      return saveData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logIn = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const resLogin = await axios.post(api.user.login(), userData, {
        withCredentials: true,
      });

      const { accessToken } = resLogin.data.data;

      // axios interceptor
      setClientHeaders(accessToken);

      setCookie('accessToken', accessToken, {
        path: '/',
        // httpOnly: true,
        // secure: true,
      });

      const saveData = {
        uid: userData.uid,
        accessToken,
        // refreshToken,
      };

      localStorage.setItem('uid', userData.uid);
      const JWT_EXPIRATION_TIME = 0.5 * 3600 * 1000;
      setInterval(logOut, JWT_EXPIRATION_TIME);

      return saveData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async () => {});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    accessToken: '',
    refreshToken: '',
    uid: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.uid = action.payload.uid;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.uid = action.payload.uid;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.payload.response.data);
      });
  },
});

// export const { } = userSlice.actions;
export default userSlice;
