import React from 'react';
import { FiBook } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BtnDiary } from './style';

function DiaryTitle({ title, diaryId, shownOnMainFeed }) {
  const navigate = useNavigate();
  const slicedTitle =
    shownOnMainFeed && title?.length > 10
      ? title?.substring(0, 10) + '...'
      : title;

  return (
    <BtnDiary
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (diaryId) {
          navigate(`/diary/${diaryId}`);
        }
      }}
    >
      <FiBook />
      &nbsp;
      {slicedTitle}
    </BtnDiary>
  );
}

export default DiaryTitle;
