import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { DiaryItemContainer, DiaryItemPrivate, DiaryItemSpan } from './style';

const DiaryItem = ({
  diaryId,
  image,
  medicalName,
  name,
  paperCount,
  subscribeCount,
  open,
  title,
  uid,
}) => {
  const navigate = useNavigate();
  const isMine = Boolean(uid === useSelector((state) => state.user.uid));

  return (
    <DiaryItemContainer
      onClick={() => {
        if (open || isMine) navigate(`/diary/${diaryId}`);
      }}
    >
      {open || <DiaryItemPrivate />}
      <BoxNoShad
        radius="20px 20px 0 0"
        color="gray"
        height="6em"
        style={{
          backgroundImage: `url("https://i8a809.p.ssafy.io/images/${image}")`,
          backgroundSize: 'cover',
        }}
      >
        <FlexDiv height="auto" align="start">
          <FlexDiv>
            <img src="/assets/icons/book-open.svg" alt="paper count" />
            <DiaryItemSpan fontSize="0.7em" padding="0 0.5em">
              {paperCount}
            </DiaryItemSpan>
          </FlexDiv>
          <FlexDiv>
            <img src="/assets/icons/bookmark-small.svg" alt="subscribe count" />
            <DiaryItemSpan fontSize="0.7em" padding="0 0.5em">
              {subscribeCount}
            </DiaryItemSpan>
          </FlexDiv>
        </FlexDiv>
      </BoxNoShad>
      <BoxNoShad
        radius="0 0 20px 20px"
        color="light"
        height="4em"
        padding="0 0.8em 0.8em 0.8em"
      >
        <FlexDiv direction="column" align="start">
          <DiaryItemSpan fontSize="0.4em" color="icon">
            {medicalName}
          </DiaryItemSpan>
          <DiaryItemSpan fontSize="0.8em" padding="0.25em 0">
            {title.length <= 7 ? title : title.substr(0, 6) + '...'}
          </DiaryItemSpan>
          <DiaryItemSpan fontSize="0.7em">{name}</DiaryItemSpan>
        </FlexDiv>
      </BoxNoShad>
    </DiaryItemContainer>
  );
};

export default DiaryItem;
