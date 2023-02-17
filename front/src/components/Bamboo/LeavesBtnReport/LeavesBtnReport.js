import axios from 'axios';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import api from '../../../api/api';
import { BtnSmall } from './style';
import { useNavigate } from 'react-router-dom';
function LeavesBtnReport({ LeafId }) {
  // 댓글 신고 컴포넌트
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const reportPaper = () => {
    navigate(`/report`, {
      state: { id: `${LeafId}`, type: 'Leaf' },
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
            reportPaper();
          }}
        >
          신고하기
        </BtnSmall>
      )}
    </div>
  );
}

export default LeavesBtnReport;
