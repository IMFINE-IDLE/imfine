import React from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { SpanLikeCmt } from './style';

function LikeComment({
  id,
  myHeart,
  likeCount,
  commentCount,
  like,
  likeDelete,
}) {
  const fillHeart = myHeart ? 'var(--red-color)' : 'none';

  return (
    <div>
      <FiHeart
        style={{
          color: 'var(--red-color)',
          fill: fillHeart,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (myHeart) {
            likeDelete(id);
          } else {
            like(id);
          }
        }}
      />
      <SpanLikeCmt>{likeCount}</SpanLikeCmt>
      <FiMessageCircle />
      <SpanLikeCmt>{commentCount}</SpanLikeCmt>
    </div>
  );
}

export default LikeComment;
