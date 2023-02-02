import React from 'react';
import { FiBook } from 'react-icons/fi';
import { BtnDiary } from './style';

function DiaryTitle({ title }) {
  return (
    <BtnDiary type="button">
      <FiBook style={{}} />
      &nbsp;
      {title}
    </BtnDiary>
  );
}

export default DiaryTitle;
