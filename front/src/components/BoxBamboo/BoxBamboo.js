import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
} from './style';

function BoxBamboo({ context, heartCount, replyCount }) {
  return (
    <BoxBambooOuter>
      <BoxShadBamboo>
        <TextContent margin={'1em 1em 0 1em'}>{context}</TextContent>
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
