import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
import './style.css';

import api from '../../api/api';
import CloverModal from '../TabBar/CloverModal';
import { BoxShad } from '../common/BoxShad/BoxShad';
import { Clover } from '../common/Clover/Clover';
import { CalendarStatusModifyBtn } from './style';

const StatusCalendar = ({ uid }) => {
  // 클로버 모달 관련 state
  const [currentClover, setCurrentClover] = useState('');
  const [cloversOpen, setCloversOpen] = useState(true);
  // 달력 관련 state
  const [value, onChange] = useState(new Date());
  const [monthCondition, setMonthCondition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 해당 달의 컨디션 정보 불러오기
  const fetchProfileCalendar = async () => {
    try {
      setError(null);
      setMonthCondition(null);
      setLoading(true);

      const params = {
        uid,
        date: moment(value).format('YYYY-MM'),
      };

      const res = await axios.get(api.profile.getMonthCondition(params), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      setMonthCondition({ ...res.data.data });
      console.log('res', res.data);
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
      <BoxShad style={{ minWidth: '22.875em' }} height="auto">
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
                code={monthCondition[moment(date).format('D') || '-1']}
                width="2.7em"
                height="2.7em"
                pointer={true}
              />
            );
          }}
        />
        {cloversOpen && (
          <CloverModal
            currentClover={currentClover}
            setCurrentClover={setCurrentClover}
            setCloversOpen={setCloversOpen}
            // style={{ position: 'relative', zIndex: '1', top: '-50%' }}
          />
        )}
      </BoxShad>
      <CalendarStatusModifyBtn color="light" height="3em" margin="1em 0">
        하루 컨디션 변경하기
      </CalendarStatusModifyBtn>
    </div>
  );
};

export default StatusCalendar;
