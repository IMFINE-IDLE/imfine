import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
} from './style';

import BambooTimer from '../BambooTimer/BambooTimer';
function BoxBamboo({ context, heartCount, replyCount, remainHour }) {
  return (
    <BoxBambooOuter>
      <BoxShadBamboo>
        <BambooTimer remainHour={remainHour} />
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
