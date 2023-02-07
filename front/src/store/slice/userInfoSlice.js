import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    cloverCode: '-1',
    searchHistory: [],
  },
  reducers: {
    updateCode: (state, action) => {
      state.cloverCode = action.payload;
    },
    addSearchHistory: (state, action) => {
      state.searchHistory.unshift(action.payload);
    },
  },
});

export const { updateCode, addSearchHistory } = userInfoSlice.actions;
export default userInfoSlice;
