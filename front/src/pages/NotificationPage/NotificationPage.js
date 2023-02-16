import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../api/api';
import { EventSourcePolyfill } from 'event-source-polyfill';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import NotificationItem from '../../components/Notification/NotificationItem/NotificationItem';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import { Clover } from '../../components/common/Clover/Clover';
import { BoxNoPaperFeed, BoxInner, TextBubble, BigCircle } from './style';
function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
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
  const userId = useSelector((state) => {
    return state.user.uid;
  });
  // 알림 리스트 GET
  const fetchNotificationsDetail = async (pagination) => {
    try {
      const res = await axios.get(
        api.notifications.getNotifications(pagination)
      );
      setIsLoading(false);
      //notifications.filter((index) => !index.check);
      const resAll = res.data.data;
      const unRead = resAll.filter((index) => !index.check);

      setNotifications((prev) => prev.concat(unRead));
      const data = res.data.data[res.data.data.length - 1];
      setHasNext((prev) => (prev = data.hasNext));
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    fetchNotificationsDetail(page);
  }, [page]);

  useEffect(() => {
    // let eventSource = new EventSourcePolyfill(
    //   `https://i8a809.p.ssafy.io/api/sse?uid=${userId}`,
    //   { withCredentials: true, heartbeatTimeout: 120000 }
    // );
    // console.log('event url', eventSource);
    // eventSource.onopen = (event) => {
    //   console.log(event.target.readyState);
    //   console.log('connection opened');
    // };
    // eventSource.onmessage = (event) => {
    //   console.log('result', event.data);
    // };
    // eventSource.onerror = (event) => {
    //   console.log(event.target.readyState);
    //   if (event.target.readyState === EventSource.CLOSED) {
    //     console.log('eventsource closed (' + event.target.readyState + ')');
    //   }
    //   eventSource.close();
    // };
    // // 기존 예제 코드
    // eventSource.addEventListener('sse', (e) => {
    //   const { data: receivedConnectData } = e;
    //   console.log('connect event', receivedConnectData);
    // });
  }, []);

  const unReadItems = notifications.filter((index) => !index.check);
  console.log('unread count', unReadItems.length);
  console.log('hasnext?', hasNext);
  return (
    <>
      <NavBarBasic
        Back={true}
        TextColor="icon"
        Text="알림 확인하기"
        BackgroundColor={'undefined'}
      />
      {unReadItems?.length === 0 ? (
        <BoxNoPaperFeed>
          <BoxInner>
            <TextBubble>
              <p>새로운 알림이 없어요!</p>
            </TextBubble>
            <div>
              <Clover code={'1'} width={'150'} height={'150'} />
            </div>
          </BoxInner>
          <BigCircle />
        </BoxNoPaperFeed>
      ) : (
        <>
          <div>
            {unReadItems.map((item) => {
              return (
                <>
                  <NotificationItem
                    key={item.notificationId}
                    notificationId={item.notificationId}
                    title={item.contentsCodeId}
                    msg={item.msg}
                    showButton={item.showButton}
                    senderUid={item.senderUid}
                    navigateId={item.contentsId}
                    check={item.check}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
      <div ref={observer} />
      {isLoading && <p>로딩중...</p>}
    </>
  );
}

export default NotificationPage;
