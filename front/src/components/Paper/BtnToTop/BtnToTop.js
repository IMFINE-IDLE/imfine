import React from 'react';
import { FiChevronsUp } from 'react-icons/fi';
import { BoxBtnToTop } from './style';

function BtnToTop() {
  return (
    <BoxBtnToTop>
      <span
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
      >
        <FiChevronsUp />맨 위로
      </span>
    </BoxBtnToTop>
  );
}

export default BtnToTop;
