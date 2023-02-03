import axios from 'axios';
import api from '../../api/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';
import BambooReplyBox from '../../components/Bamboo/BambooReplyBox/BambooReplyBox';
import { TopDiv, ReplyLabel, ReplyDiv } from './style';
import { FiMessageCircle } from 'react-icons/fi';

function BambooDetailPage() {
  const { bambooId } = useParams();
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
      console.log('error', err);
    }
  };
  useEffect(() => {
    fetchBambooDetail();
  }, []);

  if (bamboo.leafCount > 0) {
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
        <BambooReplyBox />
      </>
    );
  } else {
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

        <ReplyDiv>등록된 댓글이 없습니다?</ReplyDiv>
        <BambooReplyBox />
      </>
    );
  }
}

export default BambooDetailPage;
