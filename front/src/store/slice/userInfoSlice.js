import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cloverCode: '-1',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateCode: (state, action) => {
      state.cloverCode = action.payload;
    },
  },
});

export const { updateCode } = userInfoSlice.actions;
export default userInfoSlice;
