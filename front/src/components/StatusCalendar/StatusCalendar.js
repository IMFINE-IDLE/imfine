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
import { useSelector } from 'react-redux';

const StatusCalendar = ({ uid, diaryId, isProfile, isMine }) => {
  /*
   * Hooks
   */

  // 달력 관련 state
  const [date, setDate] = useState(new Date());
  const [monthCondition, setMonthCondition] = useState(null);
  // 개별 날짜의 일기 정보 관련 state
  const [paperInfo, setPaperInfo] = useState(null);
  const [isPaperChanged, setIsPaperChanged] = useState(false);

  // 클로버 상태 변경 관련 state
  const { cloverCode } = useSelector((state) => state.user);
  const [cloverOfDayClicked, setCloverOfDayClicked] = useState(cloverCode);
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

      const res = await axios.get(api.profile.getMonthCondition(params));

      setMonthCondition({ ...res.data.data });
      // setCloverOfDayClicked(res.data.data?.[moment(date).format('D')] || '-1');
    } catch (err) {
      console.error(err);
    }
  };

  // 선택한 날짜의 일기 불러오기
  const fetchGetDiaryPaperItem = async (diaryId, date) => {
    try {
      if (isProfile) {
        const params = { uid: uid, date: moment(date).format('YYYY-MM-DD') };

        const res = await axios.get(api.profile.getUserPaperItem(params));

        await setPaperInfo(res.data.data);
      } else {
        const params = {
          diaryId: diaryId,
          date: moment(date).format('YYYY-MM-DD'),
        };

        const res = await axios.get(api.diary.getDiaryPaperItem(params));

        await setPaperInfo(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 특정일의 컨디션 정보는 날짜를 새로 선택할 때마다 업데이트한다.
  useEffect(() => {
    setCloverOfDayClicked(monthCondition?.[moment(date).format('D')] || '-1');
  }, [date]);

  // 달력 정보는 유저가 변경될 때마다 새로 불러온다.
  useEffect(() => {
    fetchProfileCalendar(date);
  }, [isMine]);

  // 개별 날짜 일기 정보는 날짜가 바뀌거나 개별 일기 상태가 바뀌거나 유저가 변경되면 새로 불러온다.
  useEffect(() => {
    fetchGetDiaryPaperItem(diaryId, date);
  }, [date, isPaperChanged, isMine]);

  // useEffect(() => {
  //   fetchProfileCalendar(date);
  //   fetchGetDiaryPaperItem(diaryId, date);
  // }, [isMine]);

  // useEffect(() => {
  //   setCloverOfDayClicked(monthCondition?.[moment(date).format('D')] || '-1');
  //   fetchGetDiaryPaperItem(diaryId, date);
  // }, [date]);

  // useEffect(() => {
  //   fetchGetDiaryPaperItem(diaryId, date);
  // }, [isPaperChanged]);

  if (!monthCondition) return null;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
                      : monthCondition?.[moment(date).format('D') || '-1']
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
              margin="1em 0.5em 0 0.5em"
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
              margin="1em 0.5em 0 0.5em"
              onClick={() => {
                const infoToPaperCreate = {
                  year: moment(date).format('YYYY'),
                  month: moment(date).format('MM'),
                  day: moment(date).format('DD'),
                };
                // 해당 날짜 일기 작성하기
                navigate('/paper/create', {
                  state: { info: infoToPaperCreate },
                });
              }}
            >
              <span>이 날짜에</span>
              <br />
              <span>새 일기 작성하기</span>
            </CalendarStatusModifyBtn>
          </FlexDiv>
        )}

        {isProfile ? ( // 프로필일 때
          paperInfo?.map((paper) => (
            <DiaryPaperItem
              paperInfo={paper}
              key={paper.id}
              setIsPaperChanged={setIsPaperChanged}
            />
          ))
        ) : // 일기장일 때
        paperInfo ? (
          <DiaryPaperItem
            paperInfo={paperInfo}
            setIsPaperChanged={setIsPaperChanged}
          />
        ) : (
          <></>
        )}

        {Boolean(paperInfo === null || paperInfo.length === 0) && (
          <FlexDiv padding="1.5em 0 2em 0">
            <img
              src="/assets/clovers/clover1.svg"
              style={{ width: '2em', height: '2em' }}
            />
            <span style={{ color: 'var(--icon-color)', fontSize: '0.85em' }}>
              이 날짜에 아직 일기가 없어요
            </span>
          </FlexDiv>
        )}
      </FlexDiv>
    </div>
  );
};

export default StatusCalendar;
