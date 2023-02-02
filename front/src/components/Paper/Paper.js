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
        <span>{date}</span>
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
