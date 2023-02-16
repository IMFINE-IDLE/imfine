import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronsUp } from 'react-icons/fi';
import { EventSourcePolyfill } from 'event-source-polyfill';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import { Clover } from '../../components/common/Clover/Clover';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BtnToTop from '../../components/Paper/BtnToTop/BtnToTop';
import PaperList from '../../components/Paper/PaperList/PaperList';
import TabBar from '../../components/TabBar/TabBar';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '../../store/slice/eventSlice';
import {
  BigCircle,
  BoxBtnToTop,
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
  const [hasNext, setHasNext] = useState(true);
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

  // SSE이벤트처리
  //const event = useSelector((state) => state.event.isNew);
  const userId = useSelector((state) => {
    return state.user.uid;
  });
  const dispatch = useDispatch();

  // 일기 피드 조회
  const fetchPaperFeed = async (pagination) => {
    try {
      const res = await axios.get(api.paper.paperFeed(pagination));
      // console.log(res.data);
      setIsLoading(false);
      setPaperList((prev) => prev.concat(res.data.data.list));
      setHasNext((prev) => (prev = res.data.data.hasNext));
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (hasNext) fetchPaperFeed(page);
  }, [page, hasNext]);

  useEffect(() => {
    let eventSource = new EventSourcePolyfill(
      `https://i8a809.p.ssafy.io/api/sse?uid=${userId}`,
      {
        headers: { Authorization: localStorage.getItem('accessToken') },
      }
    );

    eventSource.addEventListener('sse', function (event) {
      console.log('received message: ' + event.data);
      console.log(1);
      dispatch(updateNotification({ isNew: true }));
      console.log(2);
    });

    eventSource.addEventListener('dumy', function (event) {
      console.log('dumy received message: ' + event.data);
      //setIsNew(true);
    });

    eventSource.addEventListener('error', function (event) {
      console.log('error message: ' + event.data);
    });
  }, []);

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
        <BoxPaperFeed>
          <PaperList paperList={paperList} />
          <BtnFloat />
          <Circle small />
          <Circle />
          <div ref={observer} />
          {isLoading && <p>로딩중...</p>}
          <BtnToTop />
        </BoxPaperFeed>
      )}
      <TabBar />
    </>
  );
}

export default PaperFeedPage;
