import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';

const ProfileSubscribeDiary = ({ uid, isMine }) => {
  const [diaryList, setDiaryList] = useState(null);

  // 유저가 구독중인 일기장 목록 가져오기
  const fetchGetUserSubscribeDiaryList = async () => {
    try {
      const res = await axios.get(api.diary.getUserSubscribeDiaryList(uid));
      await setDiaryList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetUserSubscribeDiaryList();
  }, [isMine]);

  return <DiaryListGrid diaryList={diaryList} />;
};

export default ProfileSubscribeDiary;
