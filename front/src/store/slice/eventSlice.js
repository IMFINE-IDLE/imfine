import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: { value: { isNew: false } },
  reducers: {
    updateNotification: (state, action) => {
      console.log('kk', action.payload);
      state.value = action.payload;
    },
  },
});

export const { updateNotification } = eventSlice.actions;
export default eventSlice;
