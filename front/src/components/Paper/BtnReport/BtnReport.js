import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
import { BoxBtnReport, BtnSmall } from './style';

function BtnReport({ apiFunc }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <BoxBtnReport>
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
            apiFunc();
          }}
        >
          신고하기
        </BtnSmall>
      )}
    </BoxBtnReport>
  );
}

export default BtnReport;
