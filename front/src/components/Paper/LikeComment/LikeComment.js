import React from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { SpanLikeCmt } from './style';

function LikeComment({ likeCount, commentCount }) {
  return (
    <div>
      <FiHeart style={{ color: 'var(--red-color)' }} />
      <SpanLikeCmt>{likeCount}</SpanLikeCmt>
      <FiMessageCircle />
      <SpanLikeCmt>{commentCount}</SpanLikeCmt>
    </div>
  );
}

export default LikeComment;
