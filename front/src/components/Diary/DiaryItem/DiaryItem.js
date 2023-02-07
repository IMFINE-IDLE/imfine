import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { DiaryItemSpan } from './style';

const DiaryItem = ({
  diaryId,
  image,
  medicalName,
  name,
  paperCount,
  subscribeCount,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ width: '30%', cursor: 'pointer' }}
      onClick={() => navigate(`/diary/${diaryId}`)}
    >
      <BoxNoShad radius="20px 20px 0 0" color="gray" height="6em">
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
          <DiaryItemSpan fontSize="0.9em" padding="0.25em 0">
            {title}
          </DiaryItemSpan>
          <DiaryItemSpan fontSize="0.7em">{name}</DiaryItemSpan>
        </FlexDiv>
      </BoxNoShad>
    </div>
  );
};

export default DiaryItem;

// <BoxShad
//   width="2em"
//   height="2em"
//   radius="50%"
//   color="light-pink"
//   padding="0"
// >
//   <DiaryItemSpan
//     fontSize="0.3em"
//     style={{
//       position: 'relative',
//       top: '50%',
//       left: '50%',
//       transform: 'translate3d(-50%, -50%, 0)',
//     }}
//   >
//     {medicalName}
//   </DiaryItemSpan>
// </BoxShad>
