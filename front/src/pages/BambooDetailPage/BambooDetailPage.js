import axios from 'axios';
import api from '../../api/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';
import { TopDiv, ReplyLabel, ReplyDiv } from './style';
import { FiMessageCircle } from 'react-icons/fi';
import BambooReplyBox from '../../components/Bamboo/BambooReplyBox/BambooReplyBox';

function BambooDetailPage() {
  const { bambooId } = useParams();
  const [bamboo, setbamboo] = useState([]);
  const [leaves, setleaves] = useState([]);

  // 대나무 좋아요 post
  const likeBamboo = async (bambooId) => {
    try {
      const res = await axios.post(
        api.bamboo.postBambooLike(bambooId),
        {
          contentId: bambooId,
        },
        {
          headers: { Authorization: localStorage.getItem('accessToken') },
        }
      );
      console.log(res);
      fetchBambooDetail();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 대나무 좋아요 취소 delete
  const removeLikeBamboo = async (bambooId) => {
    try {
      const res = await axios.delete(api.bamboo.deleteBambooLike(bambooId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      fetchBambooDetail();
    } catch (err) {
      console.log(err.repsonse.data);
    }
  };
  // 대나무 상세보기 get
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

  // 대나무 댓글달기 post
  const replyBamboo = async (replyComment) => {
    try {
      const res = await axios.post(
        api.leaf.postLeaf(),
        {
          bambooId,
          content: replyComment,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
      fetchBambooDetail();
    } catch (err) {
      console.log(err.response.data);
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
          likeBamboo={likeBamboo}
          removeLikeBamboo={removeLikeBamboo}
          heart={bamboo.heart}
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
        <BambooReplyBox replyBamboo={replyBamboo} />
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
        <BambooReplyBox replyBamboo={replyBamboo} />
      </>
    );
  }
}

export default BambooDetailPage;
