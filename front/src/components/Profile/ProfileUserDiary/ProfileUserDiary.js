import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../../api/api';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';

const ProfileUserDiary = ({ uid, isMine }) => {
  const [diaryList, setDiaryList] = useState(null);

  // 유저가 쓴 일기장 목록 가져오기
  const fetchGetUserDiaryList = async () => {
    try {
      const res = await axios.get(api.diary.getUserDiaryList(uid));
      await setDiaryList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetUserDiaryList();
  }, [isMine]);

  return <DiaryListGrid diaryList={diaryList} />;
};

export default ProfileUserDiary;
