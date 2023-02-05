import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import api from '../../api/api';
import instance from '../../api/instance';

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.user.signUp(), userData, {});
      console.log(res.data);
      alert(document.cookie);
      const cookies = new Cookies();
      alert(cookies);
      // const { uid, accessToken, refreshToken } = res.data.data;
      // const saveData = {
      //   uid: userData.uid,
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      // };
      // axios.defaults.headers.common['Authorization'] = `${accessToken}`;
      // // console.log(accessToken);
      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('uid', userData.uid);
      const JWT_EXPIRATION_TIME = 0.5 * 3600 * 1000;
      setInterval(logOut, JWT_EXPIRATION_TIME);

      // return saveData;
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logIn = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const resLogin = await axios.post(api.user.login(), userData);
      // console.log(resLogin.data.data);
      const { accessToken, refreshToken } = resLogin.data.data;
      const saveData = {
        uid: userData.uid,
        accessToken,
        refreshToken,
      };

      axios.defaults.headers.common['X-AUTH-TOKEN'] = `${accessToken}`;
      // console.log(accessToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
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
