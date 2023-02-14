import React, { useState } from 'react';
import { BoxBtnFloat, BtnLink, CircleFloat } from './style';
import { FiEdit3 } from 'react-icons/fi';

function BambooBtnFloat() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <BoxBtnFloat>
        {isClicked && (
          <>
            <BtnLink
              to="/bamboo/create"
              style={{ width: '100%' }}
              color={'light'}
              margin={'1em 0'}
              padding={'1em 0.8em'}
              radius={'50px'}
              fontSize={'1em'}
            >
              대나무숲 외치러 가기
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

export default BambooBtnFloat;
