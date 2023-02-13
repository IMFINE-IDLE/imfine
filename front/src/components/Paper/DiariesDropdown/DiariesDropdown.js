import React from 'react';
import { CenterDiv, SelectContainer, Options } from './style';
import DropDownR25 from '../../common/DropDownR25/DropDownR25';

function DiariesDropdown({ isdisabled, value, state, diaries }) {
  return (
    <>
      <CenterDiv>
        <SelectContainer
          disabled={isdisabled}
          value={value}
          onChange={(e) => state(e.target.value)}
        >
          {diaries.map((diary) => (
            <Options value={diary.diaryId} key={diary.diaryId}>
              {diary.title}
            </Options>
          ))}
        </SelectContainer>
      </CenterDiv>
    </>
  );
}

export default DiariesDropdown;
