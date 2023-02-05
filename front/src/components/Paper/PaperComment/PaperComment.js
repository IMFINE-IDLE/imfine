import React from 'react';
import BtnReport from '../BtnReport/BtnReport';

function PaperComment({ commentList }) {
  return (
    <div>
      {commentList?.map(
        ({
          commentId,
          condition,
          name,
          uid,
          content,
          createdAt,
          likeCount,
          myHeart,
        }) => {
          return (
            <div key={commentId}>
              <img
                src={`/assets/clovers/clover${condition}.svg`}
                alt=""
                width={'50px'}
                height={'50px'}
              />
              <span>{name}</span>
              <span>좋아요{likeCount}</span>
              <BtnReport />
              <div>{content}</div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default PaperComment;
