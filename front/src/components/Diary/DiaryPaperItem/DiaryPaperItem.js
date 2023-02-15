import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import LikeComment from '../../Paper/LikeComment/LikeComment';
import { Clover } from '../../common/Clover/Clover';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { BoxLT50R25 } from '../../common/BoxLT50R25/BoxLT50R25';

import {
  DiaryPaperSpan,
  DiaryPaperSymptomWrapper,
  DiaryPaperSymptomDiv,
} from './style';
import axios from 'axios';
import api from '../../../api/api';
import { SpanLikeCmt } from '../../Paper/LikeComment/style';

const DiaryPaperItem = ({ paperInfo, setIsPaperChanged }) => {
  const [isLiked, setIsLiked] = useState(paperInfo.myHeart);
  const [localLikeCount, setLocalLikeCount] = useState(paperInfo.likeCount);
  const fillHeart = isLiked ? 'var(--red-color)' : 'none';
  console.log('props', paperInfo);
  console.log('isliked', isLiked);

  // 일기 좋아요 등록
  const likePaper = async () => {
    try {
      const res = await axios.post(api.paper.paperLikePost(), {
        contentId: paperInfo.paperId,
      });
      console.log('like', res);
      setIsPaperChanged((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  // 일기 좋아요 취소
  const likePaperDelete = async () => {
    try {
      const res = await axios.delete(
        api.paper.paperLikeDelete(paperInfo.paperId)
      );
      console.log(res);
      setIsPaperChanged((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(symptomList);

  // 댓글 작업 필요

  return (
    <>
      {paperInfo && (
        <FlexDiv margin="1em 0" align="start">
          <Clover width="3.5em" height="3.5em" code={paperInfo?.condition} />
          <BoxLT50R25 height="auto" width="calc(100% - 3em)">
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
              padding="0.8em 0"
              style={{ lineHeight: '1.3em' }}
              justify="start"
            >
              <DiaryPaperSpan>{paperInfo?.content}</DiaryPaperSpan>
            </FlexDiv>

            <FlexDiv justify="end">
              <div>
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
              </div>
            </FlexDiv>
          </BoxLT50R25>
        </FlexDiv>
      )}
    </>
  );
};

export default DiaryPaperItem;
