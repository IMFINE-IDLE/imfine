import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';

function BambooDetailPage() {
  const params = useParams();
  const res = {
    success: true,
    status: 200,
    message: '요청에 성공하였습니다.',
    data: [
      {
        bambooId: 1,
        content: 'testtest',
        createdDate: 'xxxxx',
        likeCount: 2,
        leafCount: 1,
        leaf: [
          {
            leafId: 3,
            content: '얍!',
            likeCount: 0,
            declarationCount: 0,
            createDate: '2023-02-02T14:08:26.979635',
          },
          {
            leafId: 4,
            content: '슈슉!',
            likeCount: 0,
            declarationCount: 0,
            createDate: '2023-02-02T14:08:38.623898',
          },
        ],
      },
    ],
  };
  const [Bamboo, setBamboo] = useState([]);
  const [Leaves, setLeaves] = useState([]);

  useEffect(() => {
    setBamboo(res.data[0]);
    setLeaves(res.data[0].leaf);
  }, []);

  return (
    <>
      <NavBarBasic Back={true} Text={''} />
      <BambooDetailHeader
        bambooId={Bamboo.bambooId}
        content={Bamboo.content}
        leafCount={Bamboo.leafCount}
        likeCount={Bamboo.likeCount}
      />

      <div>
        {Leaves.map((leaf) => {
          return <BoxLeavesFeed leaves={leaf} key={leaf.leafId} />;
        })}
      </div>
    </>
  );
}

export default BambooDetailPage;
