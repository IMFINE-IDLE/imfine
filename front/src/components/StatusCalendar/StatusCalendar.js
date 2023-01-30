import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

import { BoxShad } from '../common/BoxShad/BoxShad';

import 'react-calendar/dist/Calendar.css';
import './style.css';

const StatusCalendar = () => {
  const [value, onChange] = useState(new Date());

  // 참고
  // const [mark, setMark] = useState([]);
  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //     },
  //   }
  // );

  const data = {
    '01': '0',
    '02': '1',
    '03': '2',
    '04': '3',
    '05': '4',
    '06': '5',
    '07': '6',
    '08': '7',
    '09': '8',
    10: '9',
    11: '0',
  };

  const onClickDay = (value, event) => {};

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
            // 날짜별 클로버 이미지 - 차후 axios data로 수정
            return (
              <img
                src={`/assets/clovers/clover${
                  data[moment(date).format('DD')] || 'default'
                }.svg`}
                alt="status clover"
                style={{ width: '2.7em', height: '2.7em', cursor: 'pointer' }}
              />
            );
          }}
          // 참고
          // tileContent={({ date, view }) => {
          //   // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          //   // 추가할 html 태그를 변수 초기화
          //   let html = [];
          //   // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          //   if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
          //     html.push(<div className="dot"></div>);
          //   }
          //   // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          //   return (
          //     <>
          //       <div className="flex justify-center items-center absoluteDiv">
          //         {html}
          //       </div>
          //     </>
          //   );
          // }}
        />
      </BoxShad>
    </div>
  );
};

export default StatusCalendar;
