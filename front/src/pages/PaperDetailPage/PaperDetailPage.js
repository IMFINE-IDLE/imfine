import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';
import { resDetail } from './tmp';
import PaperComment from '../../components/Paper/PaperComment/PaperComment';
import { BoxComment } from './style';
import { FiMessageCircle } from 'react-icons/fi';

function PaperDetailPage() {
  const { paperId } = useParams();
  const [paperDetail, setPaperDetail] = useState({});
  const fetchPaperDetail = async () => {
    try {
      const res = await axios.get(api.paper.paperDetail(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      // console.log(res.data);
      setPaperDetail(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchPaperDetail();
    // setPaperDetail(resDetail.data);
  }, []);

  // 일기 좋아요 등록
  const likePaper = async (paperId) => {
    try {
      const res = await axios.post(
        api.paper.paperLikePost(),
        {
          contentId: paperId,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 일기 좋아요 취소
  const likePaperDelete = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperLikeDelete(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
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
      fetchPaperDetail();
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
      fetchPaperDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <NavBarBasic Back />
      <PaperItemDetail
        paper={paperDetail}
        paperId={paperId}
        likePaper={likePaper}
        likePaperDelete={likePaperDelete}
      />
      <BoxComment>
        <div style={{ marginBottom: '1em' }}>
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
        </div>
      </BoxComment>
    </>
  );
}

export default PaperDetailPage;
