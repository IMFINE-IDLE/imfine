import React from 'react';
import { BoxOuter, BoxHeader, Content, BambooImg } from './style';

function BambooDetailHeader({ content }) {
  return (
    <div>
      <BoxOuter>
        <BoxHeader>
          <Content>{content}</Content>
          <BambooImg />
        </BoxHeader>
      </BoxOuter>
    </div>
  );
}

export default BambooDetailHeader;
