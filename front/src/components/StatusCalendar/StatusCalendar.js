import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
import './style.css';

import api from '../../api/api';
import CloverModal from '../CloverModal/CloverModal';
import { BoxShad } from '../common/BoxShad/BoxShad';
import { Clover } from '../common/Clover/Clover';
import { CalendarStatusModifyBtn } from './style';

const StatusCalendar = ({ uid }) => {
  // 내 프로필인지 여부를 체크해서 내 프로필일 때만 상태변경 버튼 표시
  const isMine = useRef(uid === localStorage.getItem('uid') ? true : false);

  // 달력 관련 state
  const [date, onChange] = useState(new Date());
  const [monthCondition, setMonthCondition] = useState(null);
  console.log('date state', date);

  // 클로버 상태 변경 관련 state
  const [cloverOfDayClicked, setCloverOfDayClicked] = useState('-1');
  const [cloversOpen, setCloversOpen] = useState(false);
  const [dayClicked, setDayClicked] = useState(date);

  // 해당 달의 컨디션 정보 불러오기
  const fetchProfileCalendar = async (date) => {
    try {
      const params = {
        uid,
        date: moment(date).format('YYYY-MM'),
      };

      const res = await axios.get(api.profile.getMonthCondition(params), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      setMonthCondition({ ...res.data.data });
      setCloverOfDayClicked(res.data.data[moment(date).format('D')]);
      // setCloverOfDayClicked(monthCondition[])
      // console.log('res', res.data.data);
      // console.log('data', monthCondition);
      // console.log('dayclicked', dayClicked);
      // console.log('cloverOfDayClicked', cloverOfDayClicked);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfileCalendar(date);
  }, []);

  // 날짜 선택했을 때 날짜와 클로버 상태 저장
  const onClickDay = (value, event) => {
    setDayClicked(value);
    const cloverOfDayClicked =
      monthCondition[moment(value).format('D')] || '-1';
    setCloverOfDayClicked(cloverOfDayClicked);
  };

  if (!monthCondition) return null;

  return (
    <div style={{ width: '21em', position: 'relative', padding: '0 0.5em' }}>
      <BoxShad height="auto">
        <Calendar
          onChange={onChange}
          value={date}
          calendarType="US" // 일요일부터 시작
          showNeighboringMonth={false} // 앞뒤 달에 속한 날짜들 안 보이게 설정
          formatDay={(locale, date) => moment(date).format('D')} // 개별 날짜표시 숫자만 보이게
          minDetail="month" // 월별 달력만 보이게 설정
          prevLabel={<img src="/assets/icons/chevron-left.svg" alt="prev" />} // 앞쪽 이동 화살표
          nextLabel={<img src="/assets/icons/chevron-right.svg" alt="next" />} // 뒤쪽 이동 화살표
          prev2Label={null} // 연간 이동 삭제
          next2Label={null} // 연간 이동 삭제
          navigationLabel={({ date }) => moment(date).format('YYYY.MM')} // 내비게이션 표기형식 설정
          onActiveStartDateChange={({ activeStartDate, value, view }) => {
            // 월 이동시 해당월 데이터 받아오기
            fetchProfileCalendar(activeStartDate);
          }}
          onClickDay={onClickDay} // 특정 날짜 선택했을 때 일기 불러올 함수
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
      </BoxShad>

      {cloversOpen && (
        <CloverModal
          date={dayClicked}
          currentClover={cloverOfDayClicked}
          setCurrentClover={setCloverOfDayClicked}
          setCloversOpen={setCloversOpen}
          fetchProfileCalendar={fetchProfileCalendar}
          isCenter={true}
        />
      )}

      {isMine.current && (
        <CalendarStatusModifyBtn
          color="light"
          height="3em"
          margin="1em 0"
          onClick={() => {
            if (date <= new Date()) setCloversOpen((prev) => !prev);
          }}
        >
          이 날짜의 컨디션 변경하기
        </CalendarStatusModifyBtn>
      )}
    </div>
  );
};

export default StatusCalendar;
