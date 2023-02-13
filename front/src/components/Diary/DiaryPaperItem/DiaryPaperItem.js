import React from 'react';
import { Clover } from '../../common/Clover/Clover';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { BoxLT50R25 } from '../../common/BoxLT50R25/BoxLT50R25';
import moment from 'moment';
import 'moment/locale/ko';
import LikeComment from '../../Paper/LikeComment/LikeComment';

import {
  DiaryPaperSpan,
  DiaryPaperSymptomWrapper,
  DiaryPaperSymptomDiv,
} from './style';

const DiaryPaperItem = ({ paperInfo }) => {
  console.log('props', paperInfo);

  // // 일기 좋아요 등록
  // const likePaper = async (paperId) => {
  //   try {
  //     const res = await axios.post(
  //       api.paper.paperLikePost(),
  //       {
  //         contentId: paperId,
  //       },
  //       { headers: { Authorization: localStorage.getItem('accessToken') } }
  //     );
  //     console.log(res);
  //     fetchGetDiaryPaperItem(diaryId, createdAt);
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // };

  // // 일기 좋아요 취소
  // const likePaperDelete = async (paperId) => {
  //   try {
  //     const res = await axios.delete(api.paper.paperLikeDelete(paperId), {
  //       headers: { Authorization: localStorage.getItem('accessToken') },
  //     });
  //     console.log(res);
  //     fetchGetDiaryPaperItem(diaryId, createdAt);
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // };

  // console.log(symptomList);

  // 댓글 작업 필요

  return (
    <>
      <FlexDiv margin="1em 0" align="start">
        <Clover width="4em" height="4em" code={paperInfo.condition} />
        <BoxLT50R25 height="auto">
          <FlexDiv justify="start">
            <DiaryPaperSpan
              size="0.75em"
              bold={true}
              style={{
                paddingLeft: '1em',
                marginRight: '1em',
              }}
            >
              {moment(new Date(paperInfo.date))
                .locale('ko')
                .format('MM.DD ddd')}
            </DiaryPaperSpan>
            <DiaryPaperSymptomWrapper
              width="60%"
              justify="start"
              align="center"
            >
              {paperInfo.symptomList?.map((symptom) => (
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
          <FlexDiv padding="0.5em 0" style={{ lineHeight: '1.3em' }}>
            <DiaryPaperSpan>{paperInfo.content}</DiaryPaperSpan>
          </FlexDiv>
          {/* <img /> */}
          <FlexDiv justify="end">
            <LikeComment
              id={paperInfo.paperId}
              myHeart={paperInfo.myHeart}
              likeCount={paperInfo.likeCount}
              commentCount={paperInfo.commentCount}
              like={paperInfo.likePaper}
              likeDelete={paperInfo.likePaperDelete}
            />
          </FlexDiv>
        </BoxLT50R25>
      </FlexDiv>
    </>
  );
};

export default DiaryPaperItem;
