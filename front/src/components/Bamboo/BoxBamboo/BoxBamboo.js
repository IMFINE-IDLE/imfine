import React, { useState, useEffect, useRef } from 'react';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import BoxBambooFeed from '../BoxBambooFeed/BoxBambooFeed';
import axios from 'axios';
import api from '../../../api/api';
import BtnToTop from '../../Paper/BtnToTop/BtnToTop';
import { Blank, BoxInner, TextBubble } from './style';
import { Clover } from '../../common/Clover/Clover';
function BoxBamboo() {
  //console.log(res);
  const [bambooList, setBambooList] = useState([]);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // paging
  const observerRef = useRef();
  const observer = (element) => {
    if (isLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNext) {
        setPage((prev) => prev + 1);
        setIsLoading(true);
      }
    });

    element && observerRef.current.observe(element);
  };

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
    } catch (err) {
      console.log(err.repsonse.data);
    }
  };

  // 대나무 ALL
  const fetchBambooFeed = async (pagination) => {
    try {
      const res = await axios.get(api.bamboo.getBambooFeed(pagination), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setBambooList((prev) => prev.concat(res.data.data));
      const data = res.data.data[res.data.data.length - 1];
      setHasNext((prev) => (prev = data.hasNext));
    } catch (err) {
      console.log('err occured', err);
    }
  };

  useEffect(() => {
    fetchBambooFeed(page);
  }, [page]);

  if (bambooList.length > 0) {
    return (
      <>
        <FlexDiv direction={'column'}>
          {bambooList &&
            bambooList.map((bamboo) => {
              return (
                <BoxBambooFeed
                  bamboo={bamboo}
                  likeBamboo={likeBamboo}
                  removeLikeBamboo={removeLikeBamboo}
                  key={bamboo.bambooId}
                />
              );
            })}
          <div ref={observer} />
          <BtnToTop />
          <Blank />
        </FlexDiv>
      </>
    );
  } else {
    return (
      <FlexDiv direction={'column'}>
        <BoxInner>
          <TextBubble>
            <p>아직 심어진 대나무가 없어요!</p>
          </TextBubble>
          <div>
            <Clover code={'1'} width={'100'} height={'100'} />
          </div>
        </BoxInner>
      </FlexDiv>
    );
  }
}

export default BoxBamboo;
