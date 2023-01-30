import React from 'react';
import NavBarBasic from '../../components/common/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import { Outlet } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import {
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BoxContainer,
  BtnFilter,
  BoxOuter,
  BtnOuter,
  BoxBamboo,
  BoxBambooOuter,
  BoxBtnFilter,
  TextContent,
  LabelStatus,
  LabelOuter,
} from './Style';
import BtnFloat from '../../components/BtnFloat/BtnFloat';

function BambooPage() {
  return (
    <div>
      <NavBarBasic />
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
          <BoxBambooOuter>
            <BoxBamboo>
              <TextContent margin={'1em 1em 0 1em'}>
                설날진짜얼마안남음벌써1월다갔다설날진짜얼마안남음벌써1월다갔다설날진짜얼마안남음벌써1월다갔다왔다갔다흑흑흑흑흑60자
              </TextContent>
              <LabelOuter>
                <BsHeartFill />
                <LabelStatus>1</LabelStatus>
                <RiChat3Line />
                <LabelStatus>2</LabelStatus>
              </LabelOuter>
            </BoxBamboo>
          </BoxBambooOuter>
        </BoxContainer>
      </BoxOuter>
    </div>
  );
}

export default BambooPage;
