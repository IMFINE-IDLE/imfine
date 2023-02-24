import React, { useState } from 'react';
import { BoxBtnFloat, BtnLink, CircleFloat } from './style';
import { FiEdit3 } from 'react-icons/fi';

function BtnFloat() {
  const [isClicked, setIsClicked] = useState(false);
  const currentDate = new Date();
  const infoToPaperCreate = {
    year: currentDate.getFullYear(),
    month: (currentDate.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    day: currentDate.getDate().toString().padStart(2, '0'),
  };
  // console.log('info', infoToPaperCreate);

  return (
    <>
      <BoxBtnFloat>
        {isClicked && (
          <>
            <BtnLink
              to={{
                pathname: '/paper/create',
              }}
              state={{ info: infoToPaperCreate, dateFixed: false }}
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
              color={'light'}
              margin={'1em 0'}
              padding={'1em 0.8em'}
              fontSize={'1em'}
            >
              새로 일기장 생성하기
            </BtnLink>
          </>
        )}
        <CircleFloat onClick={() => setIsClicked((prev) => !prev)}>
          <FiEdit3 />
        </CircleFloat>
      </BoxBtnFloat>
    </>
  );
}

export default BtnFloat;
