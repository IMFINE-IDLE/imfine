import axios from 'axios';
import React, { useState } from 'react';
import { FiHeart, FiMessageCircle, FiTrash2 } from 'react-icons/fi';
import api from '../../../api/api';
import Modal from '../../Modal/Modal';
import BtnReport from '../BtnReport/BtnReport';
import {
  BoxBtns,
  BoxCommentItem,
  BoxContent,
  BoxTop,
  BoxUser,
  SpanUser,
} from './style';

function PaperComment({ comment, paperId }) {
  const {
    commentId,
    condition,
    name,
    userStatus,
    uid,
    content,
    createdAt,
    likeCount,
    myHeart,
  } = comment;

  // 댓글 삭제
  const deleteComment = async () => {
    try {
      const res = await axios.delete(api.comment.commentDelete(commentId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const fillHeart = myHeart ? 'var(--red-color)' : 'none';
  // 댓글 좋아요 등록
  const likeComment = async () => {
    try {
      const res = await axios.post(
        api.comment.commentLike(),
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

  // 댓글 좋아요 취소
  const likeCommentDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        api.comment.commentLikeDelete(),
        {
          contentId: commentId,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 댓글 삭제, 신고 위한 모달
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <BoxCommentItem>
        <BoxTop>
          <BoxUser>
            <img
              src={`/assets/clovers/clover${condition}.svg`}
              alt=""
              width={'50px'}
              height={'50px'}
            />
            <SpanUser>{name}</SpanUser>
            {Boolean(!userStatus) && (
              <FiTrash2
                onClick={() => {
                  setModalOpen(true);
                }}
                size="16px"
              />
            )}
          </BoxUser>
          <BoxBtns>
            <div style={{ marginRight: '.2em' }}>
              <FiHeart
                style={{
                  color: 'var(--red-color)',
                  fill: fillHeart,
                  marginRight: '.2em',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (myHeart) {
                    // 좋아요 되어있으면 취소
                    likeCommentDelete(commentId);
                  } else {
                    // 좋아요 안되어있으면 등록
                    likeComment();
                  }
                }}
              />
              <span
                style={{
                  color: 'var(--icon-color)',
                }}
              >
                {likeCount}
              </span>
            </div>
            <BtnReport />
          </BoxBtns>
        </BoxTop>
        <BoxContent>{content}</BoxContent>
      </BoxCommentItem>
      {modalOpen && (
        <Modal
          type={'댓글'}
          action={'삭제'}
          setModalOpen={setModalOpen}
          apiFunc={() => deleteComment(commentId)}
        />
      )}
    </>
  );
}

export default PaperComment;
