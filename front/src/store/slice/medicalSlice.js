import { createSlice } from '@reduxjs/toolkit';

const medicalSlice = createSlice({
  name: 'medicalSlice',
  initialState: {
    medicalList: [
      {
        id: 1,
        name: '가정의학과 & 내과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
      {
        id: 2,
        name: '가정의학과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
      {
        id: 3,
        name: '내과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
      {
        id: 4,
        name: '가정의학과 & 내과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
      {
        id: 5,
        name: '가정의학과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
      {
        id: 6,
        name: '내과',
        imgSrc: '/assets/icons/가정의학과.png',
      },
    ],
    symptomList: [],
  },
  reducers: {
    // 나중에 질병/수술, 증상 받아오는 로직
    // fetchSymptom: (state, action) =>
  },
});

// export const { fetchSymptom } = medicalSlice.actions;

export default medicalSlice;
