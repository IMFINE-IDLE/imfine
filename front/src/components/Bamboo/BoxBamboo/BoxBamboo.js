import React, { useState, useEffect } from 'react';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import BoxBambooFeed from '../BoxBambooFeed/BoxBambooFeed';

function BoxBamboo({ res }) {
  console.log(res);
  const [bambooList, setBambooList] = useState([]);
  useEffect(() => {
    setBambooList(res.data);
  }, [res.data]);

  if (res) {
    return (
      <FlexDiv direction={'column'}>
        {bambooList &&
          bambooList.map((bamboo) => {
            return <BoxBambooFeed bamboo={bamboo} key={bamboo.bambooId} />;
          })}
      </FlexDiv>
    );
  } else {
    return <FlexDiv direction={'column'}>심어진 대나무가 없어요!</FlexDiv>;
  }
}

export default BoxBamboo;
