import React from 'react';
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
