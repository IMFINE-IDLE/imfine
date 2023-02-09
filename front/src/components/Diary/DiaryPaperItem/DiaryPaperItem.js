import React, { useEffect, useState } from 'react';
import { Clover } from '../../common/Clover/Clover';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { BoxLT50R25 } from '../../common/BoxLT50R25/BoxLT50R25';
import moment from 'moment';
import 'moment/locale/ko';
import LikeComment from '../../Paper/LikeComment/LikeComment';
import axios from 'axios';
import api from '../../../api/api';

const DiaryPaperItem = ({ paperInfo, fetchGetDiaryPaperItem }) => {
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
      <FlexDiv margin="5em">
        <Clover width="4em" height="4em" />
        <BoxLT50R25 height="auto">
          <FlexDiv>
            {paperInfo.symptomList?.map((symptom) => (
              <span>{symptom.name}</span>
            ))}
            <span>
              {moment(new Date(paperInfo.date))
                .locale('ko')
                .format('MM.DD ddd')}
            </span>
          </FlexDiv>
          <span>{paperInfo.content}</span>
          {/* <img /> */}
          <FlexDiv>
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
