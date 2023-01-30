import React from 'react';
import NavBarBasic from '../../components/common/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import { Outlet } from 'react-router-dom';
import {
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BoxContainer,
  BtnFilter,
  BoxOuter,
  BtnOuter,
} from './Style';
import BtnFloat from '../../components/BtnFloat/BtnFloat';

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
      <BoxOuter padding="2em 0 0 0">
        <BtnOuter>
          <BtnFilter padding={'1em'} margin={'0 1em '}>
            모두보기
          </BtnFilter>
          <BtnFilter padding={'1em'} margin={'0 1em '}>
            나의활동
          </BtnFilter>
        </BtnOuter>

        <BoxContainer padding="20em" margin="-1em 0"></BoxContainer>
      </BoxOuter>
    </div>
  );
}

export default BambooPage;
