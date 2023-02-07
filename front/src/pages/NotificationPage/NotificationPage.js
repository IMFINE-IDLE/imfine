import React, { useState, useEffect } from 'react';
import api from '../../api/api';
function NotificationPage() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem('accessToken') != null) {
      console.log('tokentest', localStorage.getItem('accessToken'));
      let uid = localStorage.getItem('uid'); //uid로 할수 있나
      let eventSource = new EventSource(
        `http://i8a809.p.ssafy.io/api/notification/subscribe?uid=${uid}`,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
          withCredentials: true,
        }
      );
      msetEventSource(eventSource);

      eventSource.onopen = (event) => {
        console.log('connection opened');
      };

      eventSource.onmessage = (event) => {
        console.log('result', event.data);
        setData((old) => [...old, event.data]);
        setValue(event.data);
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log('eventsource closed (' + event.target.readyState + ')');
        }
        eventSource.close();
      };

      // 기존 예제 코드
      // eventSource.addEventListener('sse', function (event) {
      //   console.log(event.data);
      //   setData(event.data);
      // });

      // eventSource.addEventListener('error', function (event) {
      //   console.log(event);
      //   eventSource.close();
      // });

      setListening(true);
    }
  }, []);

  return <div></div>;
}

export default NotificationPage;
