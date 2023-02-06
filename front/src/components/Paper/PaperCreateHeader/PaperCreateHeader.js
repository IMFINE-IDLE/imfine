import React, { useState, useEffect } from 'react';
import {
  BoxPaperDetail,
  Title,
  TopDiv,
  CenterDiv,
  BottomDiv,
  SelectContainer,
  Options,
} from './style';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import DropDownR25 from '../../common/DropDownR25/DropDownR25';
function PaperCreateHeader({ items }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  const now = new Date();

  const [form, setForm] = useState({
    year: now.getFullYear(),
    month: '01',
    day: '01',
  });

  let years = [];
  let months = [];
  let days = [];

  const [dateActive, setDateActive] = useState(false);
  const [dateSelected, setDateSelected] = useState(days[0]);
  const [monthActive, setMonthActive] = useState(false);
  const [monthSelected, setMonthSelected] = useState(months[0]);
  const [yearActive, setYearActive] = useState(false);
  const [yearSelected, setYearSelected] = useState(years[0]);

  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      months.push('0' + m.toString());
    } else {
      months.push(m.toString());
    }
  }

  useEffect(() => {
    let date = new Date(yearSelected, monthSelected, 0).getDate();
    console.log('date', date);
    days = [];
    for (let d = 1; d <= date; d += 1) {
      if (d < 10) {
        // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
        days.push('0' + d.toString());
      } else {
        days.push(d.toString());
      }
    }
  }, [setMonthSelected, setDateSelected]);

  console.log('aaaa', days);
  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      <TopDiv>
        <Title>
          기록했던 <br /> 일기장을 꺼내보세요.
        </Title>
      </TopDiv>
      <CenterDiv>
        <DropDownR25
          items={items}
          active={active}
          setActive={setActive}
          selected={selected}
          setSelected={setSelected}
        />
      </CenterDiv>
      <BottomDiv>
        <DropDownR25
          items={years}
          active={yearActive}
          setActive={setYearActive}
          selected={yearSelected}
          setSelected={setYearSelected}
        />
        <DropDownR25
          items={months}
          active={monthActive}
          setActive={setMonthActive}
          selected={monthSelected}
          setSelected={setMonthSelected}
        />
        <DropDownR25
          items={days}
          active={dateActive}
          setActive={setDateActive}
          selected={dateSelected}
          setSelected={setDateSelected}
        />
      </BottomDiv>
      <BoxPaperDetail />
    </>
  );
}

export default PaperCreateHeader;
