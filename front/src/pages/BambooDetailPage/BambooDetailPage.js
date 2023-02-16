import axios from 'axios';
import api from '../../api/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';
import { TopDiv, ReplyLabel, ReplyDiv, BoxComment } from './style';
import { FiMessageCircle } from 'react-icons/fi';
import BambooReplyBox from '../../components/Bamboo/BambooReplyBox/BambooReplyBox';
import { useNavigate } from 'react-router-dom';
function BambooDetailPage() {
  const { bambooId } = useParams();
  const [bamboo, setbamboo] = useState([]);
  const [leaves, setleaves] = useState([]);

  const navigate = useNavigate();
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
      console.log('error', err.response.data.message);
      if (err.response.data.message === '24시간이 지난 게시물 입니다.') {
        alert('24시간이 지나 사라진 대나무입니다.');
        navigate(-1);
      }
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

  // 댓글 좋아요 post
  const likeLeaf = async (leafId) => {
    try {
      const res = await axios.post(
        api.leaf.postLeafLike(),
        {
          contentId: leafId,
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

  // 댓글 좋아요 취소 delete
  const deleteLikeLeaf = async (leafId) => {
    try {
      const res = await axios.delete(api.leaf.deletLeafLike(leafId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      fetchBambooDetail();
    } catch (err) {
      console.log(err.repsonse.data);
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
        Text={' '}
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
      <BoxComment>
        <TopDiv>
          <FiMessageCircle style={{ margin: '0.5em 0.5em 0.5em 1em' }} />
          <ReplyLabel>댓글 {bamboo.leafCount}개</ReplyLabel>
        </TopDiv>
        {bamboo.leafCount !== 0 ? (
          <>
            <div>
              {leaves.map((leaf) => {
                return (
                  <BoxLeavesFeed
                    likeCount={leaf.likeCount}
                    content={leaf.content}
                    key={leaf.leafId}
                    leafId={leaf.leafId}
                    likeLeaf={likeLeaf}
                    deleteLikeLeaf={deleteLikeLeaf}
                    heart={leaf.heart}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <ReplyDiv>등록된 댓글이 없습니다</ReplyDiv>
          </>
        )}
      </BoxComment>
      <div></div>
      <BambooReplyBox replyBamboo={replyBamboo} />
    </>
  );
  // if (bamboo.leafCount > 0) {
  //   return (
  //     <>
  //       <NavBarBasic
  //         TextColor={'icon'}
  //         BackgroundColor={'light'}
  //         Back={true}
  //         Text={' '}
  //       />

  //       <BambooDetailHeader
  //         bambooId={bamboo.bambooId}
  //         content={bamboo.content}
  //         leafCount={bamboo.leafCount}
  //         likeCount={bamboo.likeCount}
  //         likeBamboo={likeBamboo}
  //         removeLikeBamboo={removeLikeBamboo}
  //         heart={bamboo.heart}
  //       />
  //       <TopDiv>
  //         <FiMessageCircle style={{ margin: '0.5em 0.5em 0.5em 1em' }} />
  //         <ReplyLabel>댓글 {bamboo.leafCount}개</ReplyLabel>
  //       </TopDiv>

  //       <div>
  //         {leaves.map((leaf) => {
  //           return (
  //             <BoxLeavesFeed
  //               likeCount={leaf.likeCount}
  //               content={leaf.content}
  //               key={leaf.leafId}
  //               leafId={leaf.leafId}
  //               likeLeaf={likeLeaf}
  //               deleteLikeLeaf={deleteLikeLeaf}
  //               heart={leaf.heart}
  //             />
  //           );
  //         })}
  //       </div>
  //       <BambooReplyBox replyBamboo={replyBamboo} />
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <NavBarBasic
  //         TextColor={'icon'}
  //         BackgroundColor={'light'}
  //         Back={true}
  //         Text={''}
  //       />

  //       <BambooDetailHeader
  //         bambooId={bamboo.bambooId}
  //         content={bamboo.content}
  //         leafCount={bamboo.leafCount}
  //         likeCount={bamboo.likeCount}
  //         likeBamboo={likeBamboo}
  //         removeLikeBamboo={removeLikeBamboo}
  //         heart={bamboo.heart}
  //       />
  //       <TopDiv>
  //         <FiMessageCircle style={{ margin: '0.5em 0.5em 0.5em 1em' }} />
  //         <ReplyLabel>댓글 {bamboo.leafCount}개</ReplyLabel>
  //       </TopDiv>

  //       <ReplyDiv>등록된 댓글이 없습니다</ReplyDiv>
  //       <BambooReplyBox replyBamboo={replyBamboo} />
  //     </>
  //   );
  // }
}

export default BambooDetailPage;
