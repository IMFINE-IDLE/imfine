import { FiMoreVertical, FiHeart, FiMessageCircle } from 'react-icons/fi';
import {
  BoxNoShadLeaves,
  ImgLeaves,
  ColumnDiv,
  TopDiv,
  BottomDiv,
  Content,
  LikeLabel,
} from './style';

function BoxLeavesFeed({ leafId, content, likeCount, declarationCount }) {
  return (
    <div>
      <ColumnDiv>
        <BoxNoShadLeaves>
          <TopDiv>
            <FiHeart />
            <LikeLabel>{likeCount}</LikeLabel>
            <FiMoreVertical />
          </TopDiv>
          <BottomDiv>
            <ImgLeaves />
            <Content>{content}</Content>
          </BottomDiv>
        </BoxNoShadLeaves>
      </ColumnDiv>
    </div>
  );
}

export default BoxLeavesFeed;
