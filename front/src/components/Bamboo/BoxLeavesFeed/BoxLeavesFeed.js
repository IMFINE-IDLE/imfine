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

import LeavesBtnReport from '../LeavesBtnReport/LeavesBtnReport';

function BoxLeavesFeed({
  leafId,
  content,
  likeCount,
  likeLeaf,
  deleteLikeLeaf,
  heart,
}) {
  const fillHeart = heart ? 'var(--red-color)' : 'none';

  return (
    <div>
      <ColumnDiv>
        <BoxNoShadLeaves>
          <TopDiv>
            <FiHeart
              style={{
                color: 'var(--red-color)',
                fill: fillHeart,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (heart) {
                  deleteLikeLeaf(leafId);
                } else {
                  likeLeaf(leafId);
                }
              }}
            />
            <LikeLabel>{likeCount}</LikeLabel>
            <LeavesBtnReport />
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
