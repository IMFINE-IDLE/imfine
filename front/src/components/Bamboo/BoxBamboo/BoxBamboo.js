import React, { useState, useEffect } from 'react';
import BoxBambooFeed from '../BoxBambooFeed/BoxBambooFeed';

function BoxBamboo({ res }) {
  console.log(res);
  const [bambooList, setBambooList] = useState([]);
  useEffect(() => {
    setBambooList(res.data);
  }, [res.data]);

  return (
    <div>
      {bambooList &&
        bambooList.map((bamboo) => {
          return <BoxBambooFeed bamboo={bamboo} key={bamboo.bambooId} />;
        })}
    </div>
  );
}

export default BoxBamboo;
