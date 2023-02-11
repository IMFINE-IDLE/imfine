import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.user.signUp(), userData, {
        withCredentials: true,
      });
      console.log(res.data);

      const saveData = {
        uid: userData.uid,
      };

      localStorage.setItem('uid', userData.uid);

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

      localStorage.setItem('uid', userData.uid);

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
      // console.log(resLogout);

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
    uid: '',
  },
  reducers: {},
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

export default userSlice;
