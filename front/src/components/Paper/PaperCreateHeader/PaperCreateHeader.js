import React, { useState, useEffect } from 'react';
import { BoxPaperDetail, Title, TopDiv, centerDiv, bottomDiv } from './style';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
function PaperCreateHeader() {
  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      <TopDiv>
        <Title>
          기록했던 <br /> 일기장을 꺼내보세요.
        </Title>
      </TopDiv>
      <BoxPaperDetail />
    </>
  );
}

export default PaperCreateHeader;
