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

function BoxBambooFeed({ bamboo }) {
  const { content } = bamboo;
  return (
    /* box 눌렀을때 navigate 설정필요*/
    <BoxBambooOuter>
      <BoxShadBamboo>
        <BambooTimer remainHour={20} />
        <TextContent>{content}</TextContent>
        <LabelOuter>
          <BsHeartFill />
          <LabelStatus>{content}</LabelStatus>
          <RiChat3Line />
          <LabelStatus>{content}</LabelStatus>
        </LabelOuter>
      </BoxShadBamboo>
    </BoxBambooOuter>
  );
}

export default BoxBambooFeed;
