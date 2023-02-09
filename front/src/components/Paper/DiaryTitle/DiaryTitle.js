import React from 'react';
import { FiBook } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BtnDiary } from './style';

function DiaryTitle({ title, diaryId }) {
  const navigate = useNavigate();

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
      {title}
    </BtnDiary>
  );
}

export default DiaryTitle;
