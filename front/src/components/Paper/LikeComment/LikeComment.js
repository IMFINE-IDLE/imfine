import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import api from '../../../api/api';
import { SpanLikeCmt } from './style';

function LikeComment({ id, myHeart, likeCount, commentCount }) {
  const [isLiked, setIsLiked] = useState(myHeart);
  const fillHeart = isLiked ? 'var(--red-color)' : 'none';
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  useEffect(() => {
    setIsLiked(myHeart);
    setLocalLikeCount(likeCount);
  }, [myHeart, likeCount]);

  // 일기 좋아요
  const likePaper = async (paperId) => {
    try {
      const res = await axios.post(api.paper.paperLikePost(), {
        contentId: paperId,
      });
      console.log(res);
      // fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 일기 좋아요 취소
  const likePaperDelete = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperLikeDelete(paperId));
      console.log(res);
      // fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <FiHeart
        style={{
          color: 'var(--red-color)',
          fill: fillHeart,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isLiked) {
            likePaperDelete(id);
            setLocalLikeCount((prev) => prev - 1);
            setIsLiked((prev) => !prev);
          } else {
            likePaper(id);
            setLocalLikeCount((prev) => prev + 1);
            setIsLiked((prev) => !prev);
          }
        }}
      />
      <SpanLikeCmt>{localLikeCount}</SpanLikeCmt>
      <FiMessageCircle />
      <SpanLikeCmt>{commentCount}</SpanLikeCmt>
    </div>
  );
}

export default LikeComment;
