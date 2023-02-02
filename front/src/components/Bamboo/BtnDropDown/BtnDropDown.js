import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { BoxBtnFloat, IconContainer, BtnLink } from './style';

function BtnDropDown({ title }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <BoxBtnFloat>
      {isClicked && (
        <>
          <BtnLink
            to="/propslink1"
            style={{ width: '100%' }}
            color={'gray'}
            margin={'1em 0'}
            padding={'1em 0.8em'}
            fontSize={'1em'}
          >
            props2
          </BtnLink>
          <BtnLink
            to="/propslink1"
            style={{ width: '100%' }}
            color={'gray'}
            margin={'0'}
            padding={'1em 0.8em'}
            radius={'50px'}
            fontSize={'1em'}
          >
            props1
          </BtnLink>
        </>
      )}
      <IconContainer>
        <BsThreeDots
          onClick={() => setIsClicked((prev) => !prev)}
        ></BsThreeDots>
      </IconContainer>
    </BoxBtnFloat>
  );
}

export default BtnDropDown;
