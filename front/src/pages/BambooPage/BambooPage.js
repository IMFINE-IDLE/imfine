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
} from './Style';
import BtnFloat from '../../components/BtnFloat/BtnFloat';

function BambooFeedPage() {
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
      <BoxOuter>
        <BtnFilter></BtnFilter>
        <BoxContainer />
      </BoxOuter>
    </div>
  );
}

export default BambooFeedPage;
