import React from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import { PickedTitle } from './style';

const PickedItemList = ({ title, isIcon, text }) => {
  return (
    <>
      <div>PickedItemList</div>
      <FlexDiv>
        <PickedTitle>{title}</PickedTitle>
        <span>&nbsp; | &nbsp;</span>
        {isIcon ? <></> : <span>{text}</span>}
      </FlexDiv>
    </>
  );
};

export default PickedItemList;
