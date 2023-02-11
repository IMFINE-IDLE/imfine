import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api';

import {
  BoxInnerReport,
  Label,
  CenterDiv,
  SelectContainer,
  Options,
  BtnUpdate,
} from './style';

import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
function ReportPage({ type }) {
  // type: Diary, Paper, Comment, Bamboo, Leaf
  const { contentId } = useParams();
  const [reportType, setReportType] = useState('');
  const cases = [
    { type: 1, typename: '신고유형1' },
    { type: 2, typename: '신고유형2' },
  ];

  const sendReport = async () => {
    try {
      await axios.post(api.report.report`${type}`(), {
        type: reportType,
        contentsId: contentId,
      });
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <div>
      <NavBarBasic />
      <BoxInnerReport>
        <Label> 요청 유형을 선택해주세요. </Label>

        <SelectContainer
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          {cases.map((c) => (
            <Options value={c.type} key={c.type}>
              {c.typename}
            </Options>
          ))}
        </SelectContainer>
        <FlexDiv>
          <BtnUpdate onClick={sendReport}>신고하기</BtnUpdate>
        </FlexDiv>
      </BoxInnerReport>
    </div>
  );
}

export default ReportPage;
