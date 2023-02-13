import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
import './style.css';

import api from '../../api/api';
import CloverModal from '../CloverModal/CloverModal';
import DiaryPaperItem from '../Diary/DiaryPaperItem/DiaryPaperItem';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import { BoxShad } from '../common/BoxShad/BoxShad';
import { Clover } from '../common/Clover/Clover';
import { CalendarStatusModifyBtn } from './style';
import { useNavigate } from 'react-router-dom';

const StatusCalendar = ({ uid, diaryId, isProfile, isMine }) => {
  /*
   * Hooks
   */

  // 달력 관련 state
  const [date, setDate] = useState(new Date());
  const [monthCondition, setMonthCondition] = useState(null);
  // 개별 날짜의 일기 정보 관련 state
  const [paperInfo, setPaperInfo] = useState(null);

  // 클로버 상태 변경 관련 state
  const [cloverOfDayClicked, setCloverOfDayClicked] = useState('-1');
  const [cloversOpen, setCloversOpen] = useState(false);

  const navigate = useNavigate();

  /*
   * Functions
   */

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
    } catch (err) {
      console.error(err);
    }
  };

  // 선택한 날짜의 일기 불러오기
  const fetchGetDiaryPaperItem = async (diaryId, date) => {
    try {
      if (isProfile) {
        const params = { uid, date: moment(date).format('YYYY-MM-DD') };

        const res = await axios.get(api.profile.getUserPaperItem(params));

        await setPaperInfo(res.data.data);
        console.log('p res', res.data.data);
        console.log('p', paperInfo);
      } else {
        const params = {
          diaryId,
          date: moment(date).format('YYYY-MM-DD'),
        };

        const res = await axios.get(api.diary.getDiaryPaperItem(params));

        await setPaperInfo(res.data.data);
        console.log('diarypaper res', res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfileCalendar(date);
  }, []);

  // 날짜를 새로 선택할 때마다
  // 해당 날짜의 컨디션 정보를 저장하고 개별 일기 정보를 불러오기
  useEffect(() => {
    fetchGetDiaryPaperItem(diaryId, date);
    setCloverOfDayClicked(monthCondition[moment(date).format('D')] || '-1');
  }, [date]);

  // // 날짜 선택했을 때 날짜와 클로버 상태 업데이트
  // const onClickDay = async (date, event) => {
  //   setDate(date);
  //   // const cloverOfDayClicked = monthCondition[moment(date).format('D')] || '-1';
  //   // console.log('cloverOfDayClicked', cloverOfDayClicked);
  //   // setCloverOfDayClicked(cloverOfDayClicked);
  //   // fetchGetDiaryPaperItem(diaryId, date);
  // };

  if (!monthCondition) return null;

  return (
    <div style={{ position: 'relative' }}>
      <FlexDiv direction="column">
        <BoxShad height="auto">
          <Calendar
            onChange={setDate}
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
            onClickDay={() => setDate(date)}
            tileContent={({ date }) => {
              return (
                <Clover
                  // code={monthCondition[moment(date).format('D') || '-1']}
                  code={
                    moment(date).isAfter(new Date())
                      ? 'blank'
                      : monthCondition[moment(date).format('D') || '-1']
                  }
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
            date={date}
            currentClover={cloverOfDayClicked}
            setCurrentClover={setCloverOfDayClicked}
            setCloversOpen={setCloversOpen}
            fetchProfileCalendar={fetchProfileCalendar}
            isCenter={true}
          />
        )}

        {isMine && (
          <FlexDiv>
            <CalendarStatusModifyBtn
              color="light"
              height="auto"
              margin="1em 0.5em"
              onClick={() => {
                if (date <= new Date()) setCloversOpen((prev) => !prev);
              }}
            >
              <span>이 날짜의</span>
              <br />
              <span>컨디션 변경하기</span>
            </CalendarStatusModifyBtn>
            <CalendarStatusModifyBtn
              height="auto"
              margin="1em 0.5em"
              onClick={() => {
                const infoToPaperCreate = {
                  year: '2023',
                  month: '01',
                  day: '01',
                };
                navigate('/paper/create', {
                  state: { ...infoToPaperCreate, diaryId },
                });
              }}
            >
              <span>이 날짜에</span>
              <br />
              <span>새 일기 작성하기</span>
            </CalendarStatusModifyBtn>
          </FlexDiv>
        )}

        {isProfile ? (
          paperInfo?.map((paper) => (
            <DiaryPaperItem paperInfo={paper} key={paper.id} />
          ))
        ) : (
          <DiaryPaperItem paperInfo={paperInfo} />
        )}
      </FlexDiv>
    </div>
  );
};

export default StatusCalendar;
