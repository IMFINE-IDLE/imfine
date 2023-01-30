import React, { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clover } from './style';

const StatusCalendar = () => {
  const [value, onChange] = useState(new Date());
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
    '01': 0,
    '02': 1,
    '03': 2,
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        calendarType="US" // 일요일부터 시작
        showNeighboringMonth={false} // 앞뒤 달에 속한 날짜들 안 보이게 설정
        formatDay={(locale, date) => moment(date).format('D')} // 날짜 숫자만 보이게
        navigationLabel={({ date }) => moment(date).format('YYYY.MM')} // 내비게이션 표기형식 설정
        // next2Label=""
        // next2AriaLabel=""
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
        tileContent={({ date }) => {
          return (
            <>
              <Clover
                src={`/assets/clovers/clover${data[date] || 'default'}.svg`}
              />
              {/* <span>{date}</span> */}
            </>
          );
        }}
      />
    </div>
  );
};

export default StatusCalendar;
