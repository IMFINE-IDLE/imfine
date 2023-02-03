import React from 'react';
import { FiMoreVertical, FiHeart, FiMessageCircle } from 'react-icons/fi';
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
  TopDiv,
  BottomDiv,
} from './style';

function BambooDetailHeader({ bambooId, content, leafCount, likeCount }) {
  return (
    <BoxHeader>
      <TopDiv>
        <FiMoreVertical />
      </TopDiv>
      <Content>{content}</Content>
      <BottomDiv>
        <BambooImg />
        <LabelOuter>
          <FiHeart />
          <LabelStatus>{likeCount}</LabelStatus>
          <FiMessageCircle />
          <LabelStatus>{leafCount}</LabelStatus>
        </LabelOuter>
      </BottomDiv>
    </BoxHeader>
  );
}

export default BambooDetailHeader;
