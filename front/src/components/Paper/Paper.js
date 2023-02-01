import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../api/api';
import { BoxLikeCmt, BoxPaper, SpanLikeCmt } from './style';

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
      <img
        src={`/assets/clovers/clover${condition}.svg`}
        alt=""
        width={'50px'}
        height={'50px'}
      />
      {name}
      {symptomList.map((symptom) => {
        return (
          <span key={symptom.symptomId}>
            {symptom.symptomName} {symptom.score}
          </span>
        );
      })}
      <div>{title}</div>
      <div>{content}</div>
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
