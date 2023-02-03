import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
} from './style';

import BambooTimer from '../BambooTimer/BambooTimer';

function BoxBambooFeed({ bamboo }) {
  const { content, bambooId, remainTime, likeCount, leafCount } = bamboo;
  const navigate = useNavigate();
  return (
    /* box 눌렀을때 navigate 설정필요*/
    <BoxBambooOuter onClick={() => navigate(`/bamboo/${bambooId}`)}>
      <BoxShadBamboo>
        <BambooTimer remainHour={remainTime} />
        <TextContent>{content}</TextContent>
        <LabelOuter>
          <BsHeartFill />
          <LabelStatus>{likeCount}</LabelStatus>
          <RiChat3Line />
          <LabelStatus>{leafCount}</LabelStatus>
        </LabelOuter>
      </BoxShadBamboo>
    </BoxBambooOuter>
  );
}

export default BoxBambooFeed;
