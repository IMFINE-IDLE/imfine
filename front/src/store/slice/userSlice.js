import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLogin: false,
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    signUp: (state, action) => {
      const asyncSignup = async () => {
        try {
          const res = await axios.post(api.user.signUp(), action.payload);
          state.isLogin = true;
          // state.accessToken = res.data.accessToken;
          // state.refreshToken = res.data.refreshToken;
        } catch (err) {
          console.log(err);
        }
      };
      asyncSignup();
    },
  },
});

export const { signUp } = userSlice.actions;
export default userSlice;
