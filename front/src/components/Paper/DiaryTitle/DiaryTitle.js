import React from 'react';
import { FiBook } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BtnDiary } from './style';

function DiaryTitle({ title, diaryId }) {
  const navigate = useNavigate();
  const slicedTitle =
    title?.length > 11 ? title?.substring(0, 11) + '...' : title;

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
