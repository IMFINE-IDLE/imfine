import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../api/api';
import {
  BoxLikeCmt,
  BoxPaper,
  SpanLikeCmt,
  BoxTop,
  Symptom,
  BoxRight,
  BoxLeft,
  BtnDiary,
  BoxContent,
} from './style';

function Paper({ paper }) {
  const navigate = useNavigate();
  const {
    paperId,
    condition,
    name,
    title,
    content,
    likeCount,
    commentCount,
    date,
    images,
    symptomList,
  } = paper;

  // 게시글 시간 표시 함수
  function getTimeDifference(timeString) {
    let currentTime = new Date();
    let providedTime = new Date(date);
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
          <p>{name}</p>
        </BoxLeft>
        <BoxRight>
          <div>
            <BtnDiary type="button">{title}</BtnDiary>
          </div>
          <div>
            {symptomList.map((symptom) => {
              return (
                <Symptom key={symptom.symptomId}>
                  {symptom.symptomName} {symptom.score}
                </Symptom>
              );
            })}
          </div>
        </BoxRight>
      </BoxTop>
      <BoxContent>{content}</BoxContent>
      {/* {images.map((image) => {
        return <img src={`${URL}/${image}`} alt="" />;
      })} */}
      <BoxLikeCmt>
        <span>{getTimeDifference(date)}</span>
        <div>
          <FiHeart style={{ color: 'var(--red-color)' }} />
          <SpanLikeCmt>{likeCount}</SpanLikeCmt>
          <FiMessageCircle />
          <SpanLikeCmt>{commentCount}</SpanLikeCmt>
        </div>
      </BoxLikeCmt>
    </BoxPaper>
  );
}

export default Paper;
