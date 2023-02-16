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
import BambooBtnReport from '../BambooBtnReport/BambooBtnReport';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
function BambooDetailHeader({
  bambooId,
  content,
  leafCount,
  likeCount,
  likeBamboo,
  removeLikeBamboo,
  heart,
}) {
  const fillHeart = heart ? 'var(--red-color)' : 'none';
  console.log('booleanstatus', heart);
  console.log('bambooid', bambooId);
  return (
    <BoxHeader>
      <TopDiv>
        <BambooBtnReport bambooId={bambooId} />
      </TopDiv>
      <FlexDiv>
        <Content>{content}</Content>
      </FlexDiv>
      <BottomDiv>
        <BambooImg />
        <LabelOuter>
          <FiHeart
            style={{
              color: 'var(--red-color)',
              fill: fillHeart,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (heart) {
                removeLikeBamboo(bambooId);
              } else {
                likeBamboo(bambooId);
              }
            }}
          />
          <LabelStatus>{likeCount}</LabelStatus>
          <FiMessageCircle />
          <LabelStatus>{leafCount}</LabelStatus>
        </LabelOuter>
      </BottomDiv>
    </BoxHeader>
  );
}

export default BambooDetailHeader;
