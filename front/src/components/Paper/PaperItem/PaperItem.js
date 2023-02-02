import React from 'react';
import { FiBook, FiHeart } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../api/api';
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
  SpanDate,
} from './style';

function PaperItem({ paper }) {
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
        </BoxLeft>
        <BoxRight>
          <div style={{ padding: '.5em .3em' }}>
            <p style={{ fontWeight: '700' }}>{name}</p>
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
        <div>
          <BtnDiary type="button">
            <FiBook style={{}} />
            &nbsp;
            {title}
          </BtnDiary>
          <SpanDate>{getTimeDifference(date)}</SpanDate>
        </div>

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

export default PaperItem;
