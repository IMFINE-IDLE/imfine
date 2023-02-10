import React, { useState, useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import api from '../../api/api';
function NotificationPage() {
  useEffect(() => {
    if (localStorage.getItem('accessToken') != null) {
      console.log('tokentest', localStorage.getItem('accessToken'));
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

      // eventSource.addEventListener('error', function (event) {
      //   console.log(event);
      //   eventSource.close();
      // });
    }
  }, []);

  return <div></div>;
}

export default NotificationPage;
