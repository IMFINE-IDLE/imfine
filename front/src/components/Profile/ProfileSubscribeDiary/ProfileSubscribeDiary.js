import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import { axiosInstance } from '../../../api/axiosInstance';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';

const ProfileSubscribeDiary = (uid) => {
  const [diaryList, setDiaryList] = useState(null);

  // 유저가 구독중인 일기장 목록 가져오기
  const fetchGetUserSubscribeDiaryList = async () => {
    try {
      const res = await axiosInstance(api.diary.getUserDiaryList(uid));
      console.log(res.data.data);
      await setDiaryList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetUserSubscribeDiaryList();
  }, []);

  return <DiaryListGrid diaryList={diaryList} />;
};

export default ProfileSubscribeDiary;
