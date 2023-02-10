import axios from 'axios';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import api from '../../../api/api';
import { BtnSmall } from './style';

function BtnFilter({ LeafId }) {
  // 대나무숲 필터링 버튼
  // TODO: useState 부모 컴포넌트로 빼야한다.
  const [isClicked, setIsClicked] = useState(false);
  const reportPaper = async (LeafId) => {
    // 클릭했을때 실행되는 함수
  };
  return (
    <div style={{ cursor: 'pointer', position: 'relative' }}>
      <FiMoreVertical
        onClick={(e) => {
          e.stopPropagation();
          setIsClicked((prev) => !prev);
        }}
      />
      {isClicked && (
        <BtnSmall
          onClick={(e) => {
            e.stopPropagation();
            reportPaper(LeafId);
          }}
        >
          최신순
        </BtnSmall>
      )}
      {isClicked && (
        <BtnSmall
          onClick={(e) => {
            e.stopPropagation();
            reportPaper(LeafId);
          }}
        >
          마감순
        </BtnSmall>
      )}
    </div>
  );
}

export default BtnFilter;
