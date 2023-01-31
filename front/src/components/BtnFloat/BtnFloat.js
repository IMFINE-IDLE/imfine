import React, { useState } from 'react';
import { BoxBtnFloat, BtnLink, CircleFloat } from './style';
import { FiEdit3 } from 'react-icons/fi';

function BtnFloat() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <BoxBtnFloat onClick={() => setIsClicked((prev) => !prev)}>
        {isClicked && (
          <>
            <BtnLink
              to="/paper/create"
              style={{ width: '100%' }}
              color={'light'}
              margin={'0'}
              padding={'1em 0.8em'}
              radius={'50px'}
              fontSize={'1em'}
            >
              저장된 일기장에 이어쓰기
            </BtnLink>
            <BtnLink
              to="/diary/create"
              style={{ width: '100%' }}
              color={'light'}
              margin={'1em 0'}
              padding={'1em 0.8em'}
              fontSize={'1em'}
            >
              새로 일기장 생성하기
            </BtnLink>
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
