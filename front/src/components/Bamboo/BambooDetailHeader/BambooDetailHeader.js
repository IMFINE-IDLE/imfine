import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import BtnDropDown from '../BtnDropDown/BtnDropDown';
import {
  BoxOuter,
  BoxHeader,
  Content,
  BambooImg,
  LabelOuter,
  LabelStatus,
  RightDiv,
  Container,
  ReplyContainer,
} from './style';

function BambooDetailHeader({ content }) {
  return (
    <div>
      <BoxOuter>
        <BoxHeader>
          <Content>{content}</Content>
          <RightDiv>
            <BambooImg />
            <LabelOuter>
              <BsHeartFill />
              <LabelStatus>{'like'}</LabelStatus>
              <RiChat3Line />
              <LabelStatus>{'content'}</LabelStatus>
            </LabelOuter>
          </RightDiv>
          <Container>
            <BtnDropDown />
          </Container>
        </BoxHeader>
        <ReplyContainer>댓글들어가는자리</ReplyContainer>
      </BoxOuter>
    </div>
  );
}

export default BambooDetailHeader;
