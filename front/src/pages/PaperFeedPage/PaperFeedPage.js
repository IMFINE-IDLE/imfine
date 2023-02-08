import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import { Clover } from '../../components/common/Clover/Clover';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItem from '../../components/Paper/PaperItem/PaperItem';
import TabBar from '../../components/TabBar/TabBar';
import {
  BigCircle,
  BoxInner,
  BoxNoPaperFeed,
  BoxPaperFeed,
  Circle,
  TextBubble,
} from './style';

function PaperFeedPage() {
  const [paperList, setPaperList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();
  const observer = (element) => {
    if (isLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    element && observerRef.current.observe(element);
  };

  // 일기 피드 조회
  const fetchPaperFeed = async (pagination) => {
    try {
      const res = await axios.get(api.paper.paperFeed(pagination), {
        // headers: {
        //   Authorization: accessToken,
        // },
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res.data);
      setIsLoading(false);
      setPaperList((prev) => prev.concat(res.data.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchPaperFeed(page);
  }, [page]);

  const likePaper = async (paperId) => {
    try {
      const res = await axios.post(
        api.paper.paperLikePost(),
        {
          contentId: paperId,
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );
      console.log(res);
      fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const likePaperDelete = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperLikeDelete(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <NavBarBasic />
      {paperList?.length === 0 ? (
        <BoxNoPaperFeed>
          <BoxInner>
            <TextBubble>
              <p>볼 수 있는 일기가 없네요!</p>
              <p>더 많은 일기장을 구독 해볼까요?</p>
            </TextBubble>
            <div>
              <Clover code={'1'} width={'150'} height={'150'} />
            </div>
          </BoxInner>
          <BigCircle />
          <BtnFloat />
        </BoxNoPaperFeed>
      ) : (
        <>
          <BoxPaperFeed>
            {paperList?.map((paper) => {
              return (
                <PaperItem
                  paper={paper}
                  key={paper.paperId}
                  myHeart={paper.myHeart}
                  likeCount={paper.likeCount}
                  likePaper={likePaper}
                  likePaperDelete={likePaperDelete}
                />
              );
            })}
            <BtnFloat />
            <Circle small />
            <Circle />
          </BoxPaperFeed>
          <div ref={observer} />
          {isLoading && <p>로딩중...</p>}
        </>
      )}

      <TabBar />
    </>
  );
}

export default PaperFeedPage;
