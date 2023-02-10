import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';

function SearchDiary({ searchParams }) {
  const [diaryList, setDiaryList] = useState([]);

  // 일기장 검색
  const handleDiarySearch = async () => {
    try {
      const res = await axios.get(
        api.search.search('diary', searchParams.get('query'))
      );
      console.log(res.data);
      setDiaryList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleDiarySearch();
  }, []);

  return (
    <>
      {diaryList?.length > 0 ? (
        <DiaryListGrid diaryList={diaryList} />
      ) : (
        <span>검색 결과를 찾을 수 없습니다.</span>
      )}
    </>
  );
}

export default SearchDiary;
