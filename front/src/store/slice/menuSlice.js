import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

export const fetchSymptomList = createAsyncThunk(
  'menuSlice/fetchSymptomList',
  async () => {
    try {
      const res = await axios.get(api.symptom.getSymptomList());
      console.log('s test', res.data);
      return res.data.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchMedicalList = createAsyncThunk(
  'menuSlice/fetchMedicalList',
  async () => {
    try {
      const res = await axios.get(api.medical.getMedicalList());
      console.log('m test', res);
      return res.data.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  medicalMenuList: [],
  symptomMenuList: [],
};

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymptomList.fulfilled, (state, action) => {
        state.symptomMenuList = action.payload;
      })
      .addCase(fetchSymptomList.rejected, (state, action) => {
        console.log(action.payload.response);
      })
      .addCase(fetchMedicalList.fulfilled, (state, action) => {
        state.medicalMenuList = action.payload;
      })
      .addCase(fetchMedicalList.rejected, (state, action) => {
        console.log(action.payload.response);
      });
  },
});

export default menuSlice;
