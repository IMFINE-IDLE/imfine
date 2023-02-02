import React, { useState, useEffect } from 'react';
import BoxBambooFeed from '../BoxBambooFeed/BoxBambooFeed';

function BoxBamboo({ res }) {
  const [bambooList, setBambooList] = useState([]);
  useEffect(() => {
    setBambooList(res.data);
  }, [res.data]);

  return (
    <div>
      {bambooList.map((bamboo) => {
        return <BoxBambooFeed bamboo={bamboo} key={bamboo.bambooId} />;
      })}
    </div>
  );
}

export default BoxBamboo;
