import React from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import BtnReport from '../BtnReport/BtnReport';
import {
  BoxBtns,
  BoxCommentItem,
  BoxContent,
  BoxTop,
  BoxUser,
  SpanUser,
} from './style';

function PaperComment({ comment }) {
  const {
    commentId,
    condition,
    name,
    uid,
    content,
    createdAt,
    likeCount,
    myHeart,
  } = comment;
  const fillHeart = myHeart ? 'var(--red-color)' : 'none';

  return (
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
                } else {
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
  );
}

export default PaperComment;
