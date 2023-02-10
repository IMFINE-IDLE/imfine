import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

export const setClientHeaders = (token) => {
  axios.interceptors.request.use(function (config) {
    config.withCredentials = true;
    // config.headers.Authorization = token;
    return config;
  });
};

export const onSilentRefresh = async () => {
  try {
    const refresh = await axios.post(api.user.refresh());
    console.log(refresh);
  } catch (err) {
    console.log(err);
  }
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.user.signUp(), userData, {
        withCredentials: true,
      });
      console.log(res.data);
      // const accessToken = res.data.data.accessToken;

      // // 쿠키 세팅 테스트
      // setCookie('accessToken', accessToken, {
      //   path: '/',
      //   // httpOnly: true,
      //   // secure: true,
      // });

      // // axios.defaults.headers.common['Authorization'] = getCookie('accessToken');

      // // axios interceptor
      // setClientHeaders(accessToken);

      const saveData = {
        uid: userData.uid,
        // accessToken: accessToken,
        // refreshToken: refreshToken,
      };

      localStorage.setItem('uid', userData.uid);

      const JWT_EXPIRATION_TIME = 0.5 * 3600 * 1000; // 30분
      setInterval(onSilentRefresh, JWT_EXPIRATION_TIME - 60000); // accessToken 만료되기 1분전 로그인 연장

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
      console.log(resLogin);

      // axios interceptor
      // setClientHeaders(accessToken);

      // const saveData = {
      //   uid: userData.uid,
      // };

      localStorage.setItem('uid', userData.uid);
      const JWT_EXPIRATION_TIME = 0.5 * 3600 * 1000; // 30분
      setInterval(onSilentRefresh, JWT_EXPIRATION_TIME - 60000); // accessToken 만료되기 1분전 로그인 연장

      return userData.uid;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (userData, { rejectWithValue }) => {
    try {
      const resLogout = await axios.post(api.user.logout(), {
        withCredentials: true,
      });
      console.log(resLogout);
      return resLogout;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // isLogin: false,
    // accessToken: '',
    // refreshToken: '',
    uid: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogin = true;
        // state.accessToken = action.payload.accessToken;
        // state.refreshToken = action.payload.refreshToken;
        state.uid = action.payload.uid;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = true;
        // state.accessToken = action.payload.accessToken;
        // state.refreshToken = action.payload.refreshToken;
        state.uid = action.payload.uid;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogin = false;
        // state.accessToken = null;
        // state.refreshToken = null;
        state.uid = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(action.payload.response.data);
      });
  },
});

// export const { } = userSlice.actions;
export default userSlice;
