import React from 'react';
import { BoxOuter, BoxHeader, TitleHeader, SubTitleHeader } from './style';

function BambooCreate() {
  return (
    <div>
      <BoxOuter>
        <BoxHeader>
          <TitleHeader> 대나무심기</TitleHeader>
          <SubTitleHeader>
            서브텍스트입니다.
            <br />
            다음줄로도 넘어갈걸요?
          </SubTitleHeader>
        </BoxHeader>
      </BoxOuter>
    </div>
  );
}

export default BambooCreate;
