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

function BambooHeader({
  bottomValue,
  title,
  subTitle,
  secondSubTitle,
  bottom,
}) {
  return (
    <div>
      <BoxHeader bottom={bottomValue}>
        <FlexDiv
          justify={'flex-start'}
          align={'flex-start'}
          direction={'row'}
          padding={'1em 0 0 0 '}
        >
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
              padding={'0.8em 0 0 1.5em'}
            >
              <Content padding={''}>{subTitle}</Content>
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
