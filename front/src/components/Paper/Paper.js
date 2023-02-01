import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxPaper } from './style';

function Paper({ paper }) {
  const navigate = useNavigate();
  const {
    paperId,
    condition,
    name,
    content,
    likeCount,
    commentCount,
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
      <div>{content}</div>
      <span>좋아요 개수 {likeCount}</span>
      <span>댓글 개수 {commentCount}</span>
    </BoxPaper>
  );
}

export default Paper;
