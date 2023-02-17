import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { FiHeart, FiMessageCircle, FiBook } from 'react-icons/fi';
import { Clover } from '../../common/Clover/Clover';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { BoxLT50R25 } from '../../common/BoxLT50R25/BoxLT50R25';

import {
  DiaryPaperSpan,
  DiaryPaperSymptomWrapper,
  DiaryPaperSymptomDiv,
  DiaryPaperTitle,
} from './style';
import axios from 'axios';
import api from '../../../api/api';
import { SpanLikeCmt } from '../../Paper/LikeComment/style';
import { useNavigate } from 'react-router-dom';

const DiaryPaperItem = ({ paperInfo, setIsPaperChanged }) => {
  const [isLiked, setIsLiked] = useState(paperInfo.myHeart);
  const [localLikeCount, setLocalLikeCount] = useState(paperInfo.likeCount);
  const fillHeart = isLiked ? 'var(--red-color)' : 'none';

  const navigate = useNavigate();

  // 일기 좋아요 등록
  const likePaper = async () => {
    try {
      await axios.post(api.paper.paperLikePost(), {
        contentId: paperInfo.paperId,
      });

      setIsPaperChanged((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  // 일기 좋아요 취소
  const likePaperDelete = async () => {
    try {
      await axios.delete(api.paper.paperLikeDelete(paperInfo.paperId));

      setIsPaperChanged((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {paperInfo && (
        <FlexDiv margin="1em 0" align="start">
          <Clover width="3.5em" height="3.5em" code={paperInfo?.condition} />
          <BoxLT50R25
            height="auto"
            width="calc(100% - 3em)"
            onClick={() => navigate(`/paper/${paperInfo?.paperId}`)}
          >
            <FlexDiv justify="start">
              <DiaryPaperSpan
                size="0.75em"
                bold={true}
                style={{
                  paddingLeft: '0.2em',
                  marginRight: '0.5em',
                }}
                isDate={true}
              >
                {moment(new Date(paperInfo?.date))
                  .locale('ko')
                  .format('MM.DD \n ddd')}
              </DiaryPaperSpan>
              <DiaryPaperSymptomWrapper
                width="calc(100% - 1.5em)"
                justify="start"
                align="center"
              >
                {paperInfo?.symptomList.map((symptom) => (
                  <DiaryPaperSymptomDiv key={symptom.id}>
                    <DiaryPaperSpan color="gray800">
                      {symptom.name}
                    </DiaryPaperSpan>
                    <DiaryPaperSpan color="gray800">
                      {symptom.score}
                    </DiaryPaperSpan>
                  </DiaryPaperSymptomDiv>
                ))}
              </DiaryPaperSymptomWrapper>
            </FlexDiv>
            <FlexDiv
              padding="1.2em 0"
              style={{ lineHeight: '1.3em' }}
              justify="start"
            >
              <DiaryPaperSpan>{paperInfo?.content}</DiaryPaperSpan>
            </FlexDiv>

            <FlexDiv justify="space-between">
              <FlexDiv justify="start">
                <DiaryPaperTitle
                  onClick={() => navigate(`/diary/${paperInfo.diaryId}`)}
                  style={{ fontSize: '0.75em', position: 'relative' }}
                >
                  <FiBook
                    style={{ position: 'absolute', left: '0', top: '0' }}
                  />
                  <DiaryPaperSpan>
                    {paperInfo.title.length > 10
                      ? paperInfo.title?.substr(0, 10) + '...'
                      : paperInfo.title}
                  </DiaryPaperSpan>
                </DiaryPaperTitle>
                {paperInfo.open || (
                  <img src="/assets/icons/lock.svg" alt="lock" />
                )}
              </FlexDiv>
              <FlexDiv width="auto">
                <FiHeart
                  style={{
                    color: 'var(--red-color)',
                    fill: fillHeart,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isLiked) {
                      likePaperDelete();
                      setLocalLikeCount((prev) => prev - 1);
                      setIsLiked((prev) => !prev);
                    } else {
                      likePaper();
                      setLocalLikeCount((prev) => prev + 1);
                      setIsLiked((prev) => !prev);
                    }
                  }}
                />

                <SpanLikeCmt>{localLikeCount}</SpanLikeCmt>
                <FiMessageCircle />
                <SpanLikeCmt>{paperInfo.commentCount}</SpanLikeCmt>
              </FlexDiv>
            </FlexDiv>
          </BoxLT50R25>
        </FlexDiv>
      )}
    </>
  );
};

export default DiaryPaperItem;
