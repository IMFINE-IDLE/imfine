import React, { useState } from 'react';

function SearchDiary() {
  const [diaryList, setDiaryList] = useState([]);

  return (
    <div>
      SearchDiary
      <div>일기장 검색결과</div>
    </div>
  );
}

export default SearchDiary;
