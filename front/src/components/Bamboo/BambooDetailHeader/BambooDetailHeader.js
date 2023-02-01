import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import BtnDropDown from '../BtnDropDown/BtnDropDown';
import {
  BoxOuter,
  BoxHeader,
  Content,
  BambooImg,
  LabelOuter,
  LabelStatus,
} from './style';

function BambooDetailHeader({ content }) {
  return (
    <div>
      <BoxOuter>
        <BoxHeader>
          <BambooImg />
          <Content>{content}</Content>
          <BtnDropDown />
          <LabelOuter>
            <BsHeartFill />
            <LabelStatus>{'like'}</LabelStatus>
            <RiChat3Line />
            <LabelStatus>{'content'}</LabelStatus>
          </LabelOuter>
        </BoxHeader>
        <div>댓글몇개표시</div>
      </BoxOuter>
    </div>
  );
}

export default BambooDetailHeader;
