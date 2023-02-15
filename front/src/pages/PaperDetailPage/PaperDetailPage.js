import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';
import PaperComment from '../../components/Paper/PaperComment/PaperComment';
import { BoxComment } from './style';
import { FiMessageCircle } from 'react-icons/fi';
import CommentCreate from '../../components/Paper/CommentCreate/CommentCreate';
import { useCallback } from 'react';

function PaperDetailPage() {
  const { paperId } = useParams();
  const [paperDetail, setPaperDetail] = useState({});
  const fetchPaperDetail = useCallback(async () => {
    try {
      const res = await axios.get(api.paper.paperDetail(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setPaperDetail((prev) => {
        return { ...prev, ...res.data.data };
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }, [paperId]);

  useEffect(() => {
    fetchPaperDetail();
  }, [fetchPaperDetail]);

  // 댓글 작성
  const createComment = async (commentContent) => {
    try {
      const res = await axios.post(
        api.comment.commentCreate(),
        {
          paperId,
          content: commentContent,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(api.comment.commentDelete(commentId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 좋아요 등록
  const likeComment = async (paperId) => {
    try {
      const res = await axios.post(
        api.comment.commentLike(),
        {
          contentId: paperId,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
      // fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 좋아요 취소
  const likeCommentDelete = async (commentId) => {
    try {
      const res = await axios.delete(api.comment.commentLikeDelete(commentId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      // fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <NavBarBasic Back BackgroundColor={'light'} BackFromPaperDetail />
      <PaperItemDetail paper={paperDetail} paperId={paperId} />
      <BoxComment>
        <FiMessageCircle />
        <span> 댓글 {paperDetail?.comments?.length}개</span>
        {paperDetail?.comments?.map((comment) => (
          <PaperComment
            comment={comment}
            key={comment.commentId}
            deleteComment={deleteComment}
            likeComment={likeComment}
            likeCommentDelete={likeCommentDelete}
          />
        ))}
      </BoxComment>
      <CommentCreate createComment={createComment} />
    </>
  );
}

export default PaperDetailPage;
