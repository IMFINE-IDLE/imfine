import React from 'react';
import DiaryListGrid from '../../Diary/DiaryListGrid/DiaryListGrid';
import SearchNoResult from '../SearchNoResult/SearchNoResult';

function SearchDiary({ diaryList }) {
  return (
    <>
      {diaryList?.length > 0 ? (
        <DiaryListGrid diaryList={diaryList} />
      ) : (
        <SearchNoResult />
      )}
    </>
  );
}

export default SearchDiary;
