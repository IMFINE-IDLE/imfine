import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';
import PaperComment from '../../components/Paper/PaperComment/PaperComment';
import { BoxComment } from './style';
import { FiMessageCircle } from 'react-icons/fi';
import CommentCreate from '../../components/Paper/CommentCreate/CommentCreate';
import { useCallback } from 'react';
import BtnToTop from '../../components/Paper/BtnToTop/BtnToTop';
import { useRef } from 'react';

function PaperDetailPage() {
  const navigate = useNavigate();
  const { paperId } = useParams();
  const [paperDetail, setPaperDetail] = useState({});
  const commentBoxRef = useRef();
  const isMounted = useRef(2);

  const scrollToBottom = () => {
    commentBoxRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    console.log(commentBoxRef);
  };

  const fetchPaperDetail = useCallback(async () => {
    try {
      const res = await axios.get(api.paper.paperDetail(paperId));
      setPaperDetail((prev) => {
        return { ...prev, ...res.data.data };
      });
    } catch (err) {
      alert(err.response.data.message);
      navigate(-1);
    }
  }, [paperId, navigate]);

  useEffect(() => {
    fetchPaperDetail();
  }, [fetchPaperDetail]);

  useEffect(() => {
    console.log('come in');
    if (!isMounted.current) {
      scrollToBottom();
    } else {
      isMounted.current -= 1;
    }
  }, [paperDetail]);

  // 댓글 작성
  const createComment = async (commentContent) => {
    try {
      const res = await axios.post(api.comment.commentCreate(), {
        paperId,
        content: commentContent,
      });
      console.log(res);
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(api.comment.commentDelete(commentId));
      console.log(res);
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 좋아요 등록
  const likeComment = async (paperId) => {
    try {
      await axios.post(api.comment.commentLike(), {
        contentId: paperId,
      });
      // fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 좋아요 취소
  const likeCommentDelete = async (commentId) => {
    try {
      await axios.delete(api.comment.commentLikeDelete(commentId));
      // fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <NavBarBasic Back BackgroundColor={'light'} BackFromPaperDetail />
      <PaperItemDetail paper={paperDetail} paperId={paperId} />
      <BoxComment ref={commentBoxRef}>
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
        {paperDetail?.comments?.length > 0 && <BtnToTop />}
      </BoxComment>
      <CommentCreate
        createComment={createComment}
        // setWriteComment={setWriteComment}
      />
    </>
  );
}

export default React.memo(PaperDetailPage);
