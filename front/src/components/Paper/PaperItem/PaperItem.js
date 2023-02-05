import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../api/api';
import BtnReport from '../BtnReport/BtnReport';
import DiaryTitle from '../DiaryTitle/DiaryTitle';
import LikeComment from '../LikeComment/LikeComment';
import {
  BoxBottom,
  BoxPaper,
  BoxTop,
  Symptom,
  BoxRight,
  BoxLeft,
  BoxContent,
  SpanDate,
} from './style';

function PaperItem({ paper }) {
  const userId = useSelector((state) => {
    return state.user.uid;
  });
  const navigate = useNavigate();
  const {
    paperId,
    uid,
    name,
    condition,
    title,
    content,
    likeCount,
    commentCount,
    createdAt,
    images,
    symptomList,
    myHeart,
  } = paper;

  // 게시글 시간 표시 함수
  function getTimeDifference(timeString) {
    let currentTime = new Date();
    let providedTime = new Date(createdAt);
    let milli = currentTime.getTime() - providedTime.getTime();
    let timeGap = parseInt(milli / 60000);
    // console.log(paperId, timeGap);

    if (timeGap < 60) {
      return `${timeGap}분전`;
    } else if (timeGap >= 60 && timeGap < 60 * 24) {
      return `${parseInt(timeGap / 60)}시간전`;
    } else if (timeGap >= 60 * 24) {
      if (currentTime.getFullYear() - providedTime.getFullYear()) {
        return `${providedTime.getFullYear()}년 ${
          providedTime.getMonth() + 1
        }월 ${providedTime.getDate()}일`;
      } else {
        return `${providedTime.getMonth() + 1}월 ${providedTime.getDate()}일`;
      }
    }
  }

  // 내 게시글인지 여부
  const isMine = Boolean(uid === userId);

  return (
    <BoxPaper onClick={() => navigate(`/paper/${paperId}`)}>
      <BoxTop>
        <BoxLeft>
          <img
            src={`/assets/clovers/clover${condition}.svg`}
            alt=""
            width={'50px'}
            height={'50px'}
          />
        </BoxLeft>
        <BoxRight>
          <div>
            <div style={{ padding: '.5em .3em' }}>
              <p style={{ fontWeight: '700' }}>{name}</p>
            </div>
            <div>
              {symptomList?.map((symptom) => {
                return (
                  <Symptom key={symptom.symptomId}>
                    {symptom.symptomName} {symptom.score}
                  </Symptom>
                );
              })}
            </div>
          </div>
          {!isMine && <BtnReport paperId={paperId} />}
        </BoxRight>
      </BoxTop>
      <BoxContent>{content}</BoxContent>
      {/* {images.map((image) => {
        return <img src={`${URL}/${image}`} alt="" />;
      })} */}
      <BoxBottom>
        <div>
          <DiaryTitle title={title} />
          <SpanDate>{getTimeDifference(createdAt)}</SpanDate>
        </div>
        <LikeComment
          paperId={paperId}
          myHeart={myHeart}
          likeCount={likeCount}
          commentCount={commentCount}
        />
      </BoxBottom>
    </BoxPaper>
  );
}

export default PaperItem;
