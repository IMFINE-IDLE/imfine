import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import BtnReport from '../BtnReport/BtnReport';
import {
  BoxBtns,
  BoxCommentItem,
  BoxContent,
  BoxTop,
  BoxUser,
  BtnCommentHeart,
  DivUser,
} from './style';

function PaperComment({
  comment,
  paperId,
  likeComment,
  likeCommentDelete,
  deleteComment,
}) {
  const {
    commentId,
    condition,
    name,
    userStatus, // userStatus 0이면 내꺼, 다른 숫자면 다른 유저꺼
    uid,
    content,
    createdAt,
    likeCount,
    myHeart,
  } = comment;

  const [isLiked, setIsLiked] = useState(myHeart);
  const fillHeart = isLiked ? 'var(--red-color)' : 'none';
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  useEffect(() => {
    setIsLiked(myHeart);
    setLocalLikeCount(likeCount);
  }, [myHeart, likeCount]);

  // 댓글 삭제 모달
  const [commentRemoveModalOpen, setCommentRemoveModalOpen] = useState(false);
  // 댓글 신고 모달
  const [commentReportModalOpen, setCommentReportModalOpen] = useState(false);
  const navigate = useNavigate();

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
              onClick={() => navigate(`/profile/${uid}`)}
            />
            <DivUser onClick={() => navigate(`/profile/${uid}`)}>
              <span>프로필 보기</span>
              {name}
            </DivUser>
            {Boolean(!userStatus) && (
              <FiTrash2
                onClick={() => {
                  setCommentRemoveModalOpen(true);
                }}
                size="16px"
              />
            )}
          </BoxUser>
          <BoxBtns>
            <BtnCommentHeart>
              <FiHeart
                style={{
                  color: 'var(--red-color)',
                  fill: fillHeart,
                  marginRight: '.2em',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLiked) {
                    // 좋아요 되어있으면 취소
                    likeCommentDelete(commentId);
                    setLocalLikeCount((prev) => prev - 1);
                    setIsLiked((prev) => !prev);
                  } else {
                    // 좋아요 안되어있으면 등록
                    likeComment(commentId);
                    setLocalLikeCount((prev) => prev + 1);
                    setIsLiked((prev) => !prev);
                  }
                }}
              />
              <span
                style={{
                  color: 'var(--icon-color)',
                }}
              >
                {localLikeCount}
              </span>
            </BtnCommentHeart>
            <BtnReport apiFunc={() => setCommentReportModalOpen(true)} />
          </BoxBtns>
        </BoxTop>
        <BoxContent>{content}</BoxContent>
      </BoxCommentItem>
      {commentRemoveModalOpen && (
        <Modal
          type={'댓글'}
          action={'삭제'}
          setModalOpen={setCommentRemoveModalOpen}
          apiFunc={() => deleteComment(commentId)}
        />
      )}
      {commentReportModalOpen && (
        <Modal
          type={'댓글'}
          action={'신고'}
          setModalOpen={setCommentReportModalOpen}
          apiFunc={() =>
            navigate('/report', {
              state: { id: commentId, type: 'Comment' },
            })
          }
        />
      )}
    </>
  );
}

export default PaperComment;
