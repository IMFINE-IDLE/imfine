import React from 'react';
import {
  BoxOuter,
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BambooImg,
} from './style';

function BambooHeader({ title, subTitle, secondSubTitle, bottom }) {
  return (
    <div>
      <BoxOuter bottom={bottom}>
        <BoxHeader>
          <TitleHeader> {title}</TitleHeader>
          <SubTitleHeader>
            {subTitle}
            <br />
            {secondSubTitle}
          </SubTitleHeader>
          <BambooImg />
        </BoxHeader>
      </BoxOuter>
    </div>
  );
}

export default BambooHeader;
