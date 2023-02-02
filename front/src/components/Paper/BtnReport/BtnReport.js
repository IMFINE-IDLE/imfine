import axios from 'axios';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import api from '../../../api/api';
import { BtnSmall } from './style';

function BtnReport({ paperId }) {
  const [isClicked, setIsClicked] = useState(false);
  const reportPaper = async (paperId) => {
    try {
      const res = await axios.post(api.paper.paperReport(paperId));
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
            reportPaper(paperId);
          }}
        >
          신고하기
        </BtnSmall>
      )}
    </div>
  );
}

export default BtnReport;
