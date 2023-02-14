import React from 'react';
import {
  BoxOuter,
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BambooImg,
  Content,
} from './style';

import { FlexDiv } from '../../common/FlexDiv/FlexDiv';

function BambooHeader({ title, subTitle, secondSubTitle, bottom }) {
  return (
    <div>
      <BoxHeader>
        <FlexDiv direction={'row'} padding={'1em 0 0 0 '}>
          <FlexDiv
            direction={'column'}
            justify={'flex-start'}
            align={'flex-start'}
          >
            <TitleHeader> {title}</TitleHeader>
            <FlexDiv
              direction={'column'}
              justify={'flex-start'}
              align={'flex-start'}
            >
              <Content>{subTitle}</Content>
              <Content>{secondSubTitle}</Content>
            </FlexDiv>
          </FlexDiv>
          <FlexDiv justify={'flex-end'}>
            <BambooImg />
          </FlexDiv>
        </FlexDiv>
      </BoxHeader>
    </div>
  );
}

export default BambooHeader;
