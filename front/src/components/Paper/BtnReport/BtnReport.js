import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';
import { BtnSmall } from './style';

function BtnReport({ paperId }) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

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
            navigate('/신고페이지');
          }}
        >
          신고하기
        </BtnSmall>
      )}
    </div>
  );
}

export default BtnReport;
