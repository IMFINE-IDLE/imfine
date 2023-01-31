import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
  BoxTimer,
  BasicBambooImg,
  LTBambooImg,
  LBBambooImg,
} from './style';

function BoxBamboo({ context, heartCount, replyCount }) {
  return (
    <BoxBambooOuter>
      <BoxShadBamboo>
        <BoxTimer>
          <BasicBambooImg />
          <LTBambooImg />
          <LBBambooImg />
        </BoxTimer>
        <TextContent>{context}</TextContent>
        <LabelOuter>
          <BsHeartFill />
          <LabelStatus>{heartCount}</LabelStatus>
          <RiChat3Line />
          <LabelStatus>{replyCount}</LabelStatus>
        </LabelOuter>
      </BoxShadBamboo>
    </BoxBambooOuter>
  );
}

export default BoxBamboo;
