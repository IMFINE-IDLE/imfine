import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
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

      // 로그인시 당일 컨디션 불러오기
      const condition = await axios.get(
        api.user.getCloverCode({
          uid: userData.uid,
          date: moment(new Date()).format('YYYY-MM-DD'),
        })
      );
      const saveData = {
        uid: userData.uid,
        accessToken,
        cloverCode: String(condition.data.data.condition),
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
    console.log('정상적 상황에서 로그아웃 실행');
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    uid: null,
    cloverCode: '-1',
  },
  reducers: {
    updateCode: (state, action) => {
      state.cloverCode = action.payload;
    },
    // 토큰이 비정상적인 에러 상황일 때 실행
    logOutWithError: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.uid = action.payload.uid;
      state.cloverCode = action.payload.cloverCode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogin = true;
        state.uid = action.payload.uid;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = true;
        state.uid = action.payload.uid;
        state.cloverCode = action.payload.cloverCode;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogin = false;
        state.uid = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(action.payload.response.data);
      });
  },
});

export const { updateCode, logOutWithError } = userSlice.actions;
export default userSlice;
