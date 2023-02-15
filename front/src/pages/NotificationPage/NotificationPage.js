import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../api/api';
import { EventSourcePolyfill } from 'event-source-polyfill';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import NotificationItem from '../../components/Notification/NotificationItem/NotificationItem';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState([]);
  const userId = useSelector((state) => {
    return state.user.uid;
  });
  // 알림 리스트 GET
  const fetchNotificationsDetail = async () => {
    try {
      const res = await axios.get(api.notifications.getNotifications());
      console.log('notifications list res', res.data.data);
      setNotifications(res.data.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    fetchNotificationsDetail();
  }, []);

  useEffect(() => {
    let eventSource = new EventSourcePolyfill(
      `https://i8a809.p.ssafy.io/api/sse?uid=${userId}`,
      { withCredentials: true, heartbeatTimeout: 120000 }
    );
    console.log('event url', eventSource);

    eventSource.onopen = (event) => {
      console.log(event.target.readyState);
      console.log('connection opened');
    };

    eventSource.onmessage = (event) => {
      console.log('result', event.data);
    };

    eventSource.onerror = (event) => {
      console.log(event.target.readyState);
      if (event.target.readyState === EventSource.CLOSED) {
        console.log('eventsource closed (' + event.target.readyState + ')');
      }
      eventSource.close();
    };

    // 기존 예제 코드
    eventSource.addEventListener('sse', (e) => {
      const { data: receivedConnectData } = e;
      console.log('connect event', receivedConnectData);
    });
  }, []);

  const unReadItems = notifications.filter((index) => !index.check);
  console.log('unread count', unReadItems.length);

  if (unReadItems.length === 0) {
    return (
      <>
        <NavBarBasic />
        <FlexDiv>모든 알림을 확인했어요.</FlexDiv>
      </>
    );
  }
  return (
    <>
      <NavBarBasic />
      <div>
        {notifications.map((item) => {
          return (
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
          );
        })}
      </div>
    </>
  );
}

export default NotificationPage;
