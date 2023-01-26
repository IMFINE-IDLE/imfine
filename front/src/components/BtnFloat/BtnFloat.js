import React, { useState } from 'react';
import { BoxBtnFloat, CircleFloat } from './style';
import { FiEdit3 } from 'react-icons/fi';
import { BtnR50 } from '../common/BtnR50/BtnR50';

function BtnFloat() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <BoxBtnFloat onClick={() => setIsClicked((prev) => !prev)}>
        {isClicked && (
          <>
            <BtnR50
              color={'light'}
              margin={'1em 0 0 1em'}
              padding={'1em 0'}
              fontSize={'1em'}
            >
              저장된 일기장에 이어쓰기
            </BtnR50>
            <BtnR50
              color={'light'}
              margin={'1em 0 1em 1em'}
              padding={'1em'}
              fontSize={'1em'}
            >
              새로 일기장 생성하기
            </BtnR50>
          </>
        )}
        <CircleFloat>
          <FiEdit3 />
        </CircleFloat>
      </BoxBtnFloat>
    </>
  );
}

export default BtnFloat;
