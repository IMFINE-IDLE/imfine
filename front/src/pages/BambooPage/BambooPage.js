import React from 'react';
import {
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BtnFilter,
  BoxOuter,
  BtnOuter,
  BoxBtnFilter,
  BoxContainer,
} from './Style';

import BoxBamboo from '../../components/BoxBamboo/BoxBamboo';

function BambooPage() {
  return (
    <div>
      <BoxOuter>
        <BoxHeader>
          <TitleHeader> 텍스트입니다</TitleHeader>
          <SubTitleHeader>
            서브텍스트입니다.
            <br />
            다음줄로도 넘어갈걸요?
          </SubTitleHeader>
        </BoxHeader>
      </BoxOuter>
      <BoxBtnFilter>필터</BoxBtnFilter>
      <BoxOuter padding="4em 0 0 0">
        <BtnOuter>
          <BtnFilter padding={'1em'} margin={'0 1em '}>
            모두보기
          </BtnFilter>
          <BtnFilter padding={'1em'} margin={'0 1em '}>
            나의활동
          </BtnFilter>
        </BtnOuter>
        <BoxContainer margin="-1em 0">
          <BoxBamboo
            context={'aaa'}
            heartCount={'1'}
            replyCount={'2'}
            remainHour={'20'}
          >
            aaaaaaa
          </BoxBamboo>
          <BoxBamboo
            context={'aaa'}
            heartCount={'1'}
            replyCount={'2'}
            remainHour={'13'}
          >
            aaaaaaa
          </BoxBamboo>
        </BoxContainer>
      </BoxOuter>
    </div>
  );
}

export default BambooPage;
