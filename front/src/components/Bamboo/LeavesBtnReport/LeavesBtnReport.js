import axios from 'axios';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import api from '../../../api/api';
import { BtnSmall } from './style';

function LeavesBtnReport({ LeafId }) {
  // 댓글 신고 컴포넌트
  const [isClicked, setIsClicked] = useState(false);
  const reportPaper = async (LeafId) => {
    try {
      const res = await axios.post(api.leaf.reportLeaf(LeafId));
    } catch (err) {
      console.log(err);
    }
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
          신고하기
        </BtnSmall>
      )}
    </div>
  );
}

export default LeavesBtnReport;
