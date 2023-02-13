import axios from 'axios';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { BtnSmall } from './style';

function BambooBtnReport({ bambooId }) {
  // 대나무 신고 컴포넌트
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  console.log(typeof bambooId);
  const clicked = () => {
    navigate(`/report`, {
      state: { id: `${bambooId}`, type: 'Bamboo' },
    });
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
            clicked();
          }}
        >
          신고하기
        </BtnSmall>
      )}
    </div>
  );
}

export default BambooBtnReport;
