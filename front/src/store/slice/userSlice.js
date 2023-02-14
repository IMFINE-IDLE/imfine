import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { Navigate } from 'react-router';
import api from '../../api/api';

// localStorage, redux store 혼재해서 사용중이라 accessToken 두곳 다 저장

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.user.signUp(), userData, {
        withCredentials: true,
      });
      console.log(res.data);
      const accessToken = res.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;
      const saveData = {
        uid: userData.uid,
        accessToken,
      };

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
      const res = await axios.post(api.user.login(), userData, {
        withCredentials: true,
      });
      console.log(res);
      const accessToken = res.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;

      const condition = await axios.get(
        api.user.getCloverCode({
          uid: userData.uid,
          date: moment(new Date()).format('YYYY-MM-DD'),
        })
      );
      const saveData = {
        uid: userData.uid,
        accessToken,
        cloverCode: String(condition.data.condition),
      };

      return saveData;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (userData, { rejectWithValue }) => {
    console.log('로그아웃 실행');
    // localStorage.setItem('accessToken', null);

    try {
      const resLogout = await axios.post(api.user.logout(), {
        withCredentials: true,
      });
      console.log(resLogout);
      // <Navigate to="/login" />;
      return resLogout;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const tokenRefresh = createAsyncThunk(
  'user/tokenRefresh',
  async ({ rejectWithValue }) => {
    try {
      console.log('토큰 갱신');
      const res = await axios.post(api.user.refresh(), {
        withCredentials: true,
      });
      console.log('새로운 토큰', res.data.data.accessToken);
      const accessToken = res.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;
      return accessToken;
    } catch (err) {
      console.log(err);
      // logOut();
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    uid: null,
    cloverCode: '-1',
    accessToken: null,
  },
  reducers: {
    updateCode: (state, action) => {
      state.cloverCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.uid = action.payload.uid;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.uid = action.payload.uid;
        state.cloverCode = action.payload.cloverCode;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogin = false;
        state.accessToken = null;
        state.uid = null;
        // state.cloverCode = '-1';
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(tokenRefresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(tokenRefresh.rejected, (state, action) => {
        state.isLogin = false;
        state.accessToken = null;
        state.uid = null;
      });
  },
});

export const { updateCode } = userSlice.actions;
export default userSlice;
