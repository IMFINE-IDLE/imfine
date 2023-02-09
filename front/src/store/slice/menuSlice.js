import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

export const fetchSymptomList = createAsyncThunk(
  'menuSlice/fetchSymptomList',
  async () => {
    try {
      const res = await axios.get(api.symptom.getSymptomList(), {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchMedicalList = createAsyncThunk(
  'menuSlice/fetchMedicalList',
  async () => {
    try {
      const res = await axios.get(api.medical.getMedicalList(), {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  medicalMenuList: [
    {
      id: 1,
      name: '가정의학과 & 내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 2,
      name: '가정의학과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 3,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 4,
      name: '가정의학과 & 내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 5,
      name: '가정의학과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 6,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 7,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 8,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 9,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 10,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 11,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 12,
      name: '내과',
      image: '/assets/icons/가정의학과.png',
    },
  ],
  symptomMenuList: [
    {
      id: 1,
      name: '머리',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 2,
      name: '목',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 3,
      name: '어깨',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 4,
      name: '가슴',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 5,
      name: '배',
      image: '/assets/icons/가정의학과.png',
    },
    {
      id: 6,
      name: '등, 허리',
      image: '/assets/icons/가정의학과.png',
    },
  ],
};

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymptomList.fulfilled, (state, action) => {
        state.symptomMenuList = action.payload.symptomMenuList;
      })
      .addCase(fetchSymptomList.rejected, (state, action) => {
        console.log(action.payload.response.data);
      })
      .addCase(fetchMedicalList.fulfilled, (state, action) => {
        state.medicalMenuList = action.payload.medicalMenuList;
      })
      .addCase(fetchMedicalList.rejected, (state, action) => {
        console.log(action.payload.response.data);
      });
  },
});

export default menuSlice;
