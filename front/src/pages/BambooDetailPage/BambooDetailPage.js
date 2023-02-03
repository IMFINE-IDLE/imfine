import axios from 'axios';
import api from '../../api/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';

import { TopDiv, ReplyLabel } from './style';
import { FiMessageCircle } from 'react-icons/fi';

function BambooDetailPage() {
  const { bambooId } = useParams();
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
        leafCount: 2,
        leaf: [
          {
            leafId: 3,
            content: '얍!',
            likeCount: 4,
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
  const [bamboo, setbamboo] = useState([]);
  const [leaves, setleaves] = useState([]);

  const fetchBambooDetail = async () => {
    try {
      const res = await axios.get(api.bamboo.getDetailBamboo(bambooId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('bamboodetails', res.data.data);
      setbamboo(res.data.data);
      setleaves(res.data.data.leaf);
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    fetchBambooDetail();
  }, []);

  return (
    <>
      <NavBarBasic
        TextColor={'icon'}
        BackgroundColor={'light'}
        Back={true}
        Text={'대나무 작성'}
      />

      <BambooDetailHeader
        bambooId={bamboo.bambooId}
        content={bamboo.content}
        leafCount={bamboo.leafCount}
        likeCount={bamboo.likeCount}
      />
      <TopDiv>
        <FiMessageCircle style={{ margin: '0.5em 0.5em 0.5em 1em' }} />
        <ReplyLabel>댓글 {bamboo.leafCount}개</ReplyLabel>
      </TopDiv>
      <div>
        {leaves.map((leaf) => {
          return (
            <BoxLeavesFeed
              likeCount={leaf.likeCount}
              content={leaf.content}
              key={leaf.leafId}
            />
          );
        })}
      </div>
    </>
  );
}

export default BambooDetailPage;
