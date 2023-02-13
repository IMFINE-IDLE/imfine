import { formToJSON } from 'axios';
import React, { useState, useEffect } from 'react';
import { BottomDiv, SelectContainer, Options } from './style';

function DateDropdown({ isdisabled, value, state }) {
  const now = new Date();
  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let months = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      months.push('0' + m.toString());
    } else {
      months.push(m.toString());
    }
  }

  let days = [];
  let date = new Date(value.year, value.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push('0' + d.toString());
    } else {
      days.push(d.toString());
    }
  }
  return (
    <>
      <BottomDiv>
        <SelectContainer
          disabled={isdisabled}
          value={value.year}
          onChange={(e) => state({ ...value, year: e.target.value })}
        >
          {years.map((item) => (
            <Options value={item} key={item}>
              {item}
            </Options>
          ))}
        </SelectContainer>
        <SelectContainer
          disabled={isdisabled}
          value={value.month}
          onChange={(e) => state({ ...value, month: e.target.value })}
        >
          {months.map((item) => (
            <Options value={item} key={item}>
              {item}
            </Options>
          ))}
        </SelectContainer>
        <SelectContainer
          disabled={isdisabled}
          value={value.day}
          onChange={(e) => state({ ...value, day: e.target.value })}
        >
          {days.map((item) => (
            <Options value={item} key={item}>
              {item}
            </Options>
          ))}
        </SelectContainer>
      </BottomDiv>
    </>
  );
}

export default DateDropdown;
