import axios from 'axios';
import React from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import api from '../../../api/api';
import { SpanLikeCmt } from './style';

function LikeComment({ paperId, myHeart, likeCount, commentCount }) {
  const fillHeart = myHeart ? 'var(--red-color)' : 'none';
  const likePost = async () => {
    try {
      const res = await axios.post(
        api.paper.paperLikePost(),
        {
          contentId: paperId,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const likeDelete = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperLikeDelete(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
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
          if (myHeart) {
            likeDelete(paperId);
          } else {
            likePost();
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
