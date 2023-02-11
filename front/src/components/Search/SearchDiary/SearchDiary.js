import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../api/api';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';

function SearchDiary({ diaryList }) {
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
