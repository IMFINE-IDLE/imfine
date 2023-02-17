import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
} from './style';

import BambooTimer from '../BambooTimer/BambooTimer';
import { useEffect, useState } from 'react';

function BoxBambooFeed({ bamboo, likeBamboo, removeLikeBamboo }) {
  const { content, bambooId, remainTime, likeCount, leafCount, heart } = bamboo;
  const navigate = useNavigate();
  const [isliked, setIsLiked] = useState(heart);
  const fillHeart = isliked ? 'var(--red-color)' : 'none';
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  useEffect(() => {
    setIsLiked(heart);
    setLocalLikeCount(likeCount);
  }, [heart, likeCount]);

  return (
    /* box 눌렀을때 navigate 설정필요*/
    <BoxBambooOuter onClick={() => navigate(`/bamboo/${bambooId}`)}>
      <BoxShadBamboo>
        <BambooTimer remainHour={remainTime} />
        <TextContent>{content}</TextContent>
        <LabelOuter>
          <FiHeart
            style={{
              color: 'var(--red-color)',
              fill: fillHeart,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isliked) {
                removeLikeBamboo(bambooId);
                setLocalLikeCount((prev) => prev - 1);
                setIsLiked((prev) => !prev);
              } else {
                likeBamboo(bambooId);
                setLocalLikeCount((prev) => prev + 1);
                setIsLiked((prev) => !prev);
              }
            }}
          />
          <LabelStatus>{localLikeCount}</LabelStatus>
          <FiMessageCircle />
          <LabelStatus>{leafCount}</LabelStatus>
        </LabelOuter>
      </BoxShadBamboo>
    </BoxBambooOuter>
  );
}

export default BoxBambooFeed;
