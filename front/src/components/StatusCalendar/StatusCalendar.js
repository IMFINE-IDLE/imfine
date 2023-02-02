import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';

import api from '../../api/api';
import { BoxShad } from '../common/BoxShad/BoxShad';
import { Clover } from '../common/Clover/Clover';
import 'react-calendar/dist/Calendar.css';
import './style.css';

const StatusCalendar = ({ uid }) => {
  const state = useSelector((state) => state);
  const [value, onChange] = useState(new Date());
  const [monthCondition, setMonthCondition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = {
    uid,
    date: moment(value).format('YYYY-MM'),
  };

  const fetchProfileCalendar = async () => {
    try {
      setError(null);
      setMonthCondition(null);
      setLoading(true);

      const response = await axios.get(api.profile.getMonthCondition(params), {
        headers: { 'X-AUTH-TOKEN': state.user.accessToken },
      });

      setMonthCondition({ ...response.data.data });
      console.log('res', response.data);
      console.log('data', monthCondition);
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileCalendar();
  }, []);

  const onClickDay = (value, event) => {};

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!monthCondition) return null;

  return (
    <div>
      <BoxShad width="22.875em">
        <Calendar
          onChange={onChange}
          value={value}
          calendarType="US" // 일요일부터 시작
          showNeighboringMonth={false} // 앞뒤 달에 속한 날짜들 안 보이게 설정
          formatDay={(locale, date) => moment(date).format('D')} // 개별 날짜표시 숫자만 보이게
          minDetail="month" // 월별 달력만 보이게 설정
          prevLabel={<img src="/assets/icons/chevron-left.svg" alt="prev" />} // 앞쪽 이동 화살표
          nextLabel={<img src="/assets/icons/chevron-right.svg" alt="next" />} // 뒤쪽 이동 화살표
          prev2Label={null} // 연간 이동 삭제
          next2Label={null} // 연간 이동 삭제
          navigationLabel={({ date }) => moment(date).format('YYYY.MM')} // 내비게이션 표기형식 설정
          onClickDay={onClickDay()} // 특정 날짜 선택했을 때 일기 불러올 함수
          tileContent={({ date }) => {
            return (
              <Clover
                code={monthCondition[moment(date).format('YYYY-MM-DD') || '-1']}
                width="2.7em"
                height="2.7em"
                pointer={true}
              />
            );
          }}
        />
      </BoxShad>
    </div>
  );
};

export default StatusCalendar;
