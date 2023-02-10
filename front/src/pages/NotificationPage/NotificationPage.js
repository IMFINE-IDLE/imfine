import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';
import { EventSourcePolyfill } from 'event-source-polyfill';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import NotificationItem from '../../components/Notification/NotificationItem/NotificationItem';
function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

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
    let uid = localStorage.getItem('uid'); //uid로 할수 있나
    let eventSource = new EventSourcePolyfill(
      `https://i8a809.p.ssafy.io/api/notification/subscribe?uid=${uid}`,
      { withCredentials: true }
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

  return (
    <>
      <NavBarBasic />
      <div>
        {notifications.map((item) => {
          return (
            <NotificationItem
              key={item.notificationId}
              title={item.contentsCodeId}
              msg={item.msg}
              showButton={item.showButton}
              senderUid={item.senderUid}
              navigateId={item.contentsId}
            />
          );
        })}
      </div>
    </>
  );
}

export default NotificationPage;
