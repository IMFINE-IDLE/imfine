import React, { useEffect, useState } from 'react';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';
import { axiosInstance } from '../../../api/axiosInstance';
import api from '../../../api/api';

const ProfileUserDiary = ({ uid }) => {
  const [diaryList, setDiaryList] = useState(null);

  // 유저가 쓴 일기장 목록 가져오기
  const fetchGetUserDiaryList = async () => {
    try {
      const res = await axiosInstance(api.diary.getUserDiaryList(uid));
      await setDiaryList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetUserDiaryList();
  }, []);

  return <DiaryListGrid diaryList={diaryList} />;
};

export default ProfileUserDiary;
