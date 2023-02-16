import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api';

import {
  BoxInnerReport,
  Label,
  SelectContainer,
  Options,
  BtnUpdate,
} from './style';

import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
function ReportPage() {
  // 신고하기 연결방법
  /*
    const clicked = () => {
    navigate(`/report`, {
      state: { id: `${contentId}`, type: 'Bamboo' },
    });
  };

  신고하는 게시물id(contentId)를 지정해주기
  어떤 게시물이냐에 따라 신고API가 결정되므로 type을 지정해주기

  type의 종류는 다음과 같습니다.
  // type: Diary, Paper, Comment, Bamboo, Leaf
  */

  const location = useLocation();
  const type = location.state.type;
  const contentId = location.state.id;
  const navigate = useNavigate();
  console.log('type', type);
  console.log('contentId', contentId);
  const [reportType, setReportType] = useState(1);
  const cases = [
    { type: 1, typename: '광고' },
    { type: 2, typename: '도배' },
    { type: 3, typename: '욕설비하' },
    { type: 4, typename: '사칭/사기' },
    { type: 5, typename: '음란물/불건전한만남' },
  ];

  const sendReport = async () => {
    let url = '';
    // type: Diary, Paper, Comment, Bamboo, Leaf
    if (type === 'Bamboo') {
      try {
        console.log('urlroute', url);
        await axios.post(api.report.reportBamboo(), {
          type: reportType,
          contentsId: contentId,
        });
        navigate(-1);
      } catch (err) {
        console.log('Err', err);
      }
    } else if (type === 'Diary') {
      try {
        console.log('urlroute', url);
        await axios.post(api.report.reportDiary(), {
          type: reportType,
          contentsId: contentId,
        });
        navigate(-1);
      } catch (err) {
        console.log('Err', err);
      }
    } else if (type === 'Paper') {
      try {
        console.log('urlroute', url);
        await axios.post(api.report.reportPaper(), {
          type: reportType,
          contentsId: contentId,
        });
        navigate(-1);
      } catch (err) {
        console.log('Err', err);
      }
    } else if (type === 'Comment') {
      try {
        console.log('urlroute', url);
        await axios.post(api.report.reportComment(), {
          type: reportType,
          contentsId: contentId,
        });
        navigate(-1);
      } catch (err) {
        console.log('Err', err);
      }
    } else if (type === 'Leaf') {
      try {
        console.log('urlroute', url);
        await axios.post(api.report.reportLeaf(), {
          type: reportType,
          contentsId: contentId,
        });
        navigate(-1);
      } catch (err) {
        console.log('Err', err);
      }
    } else {
      alert('잘못된 접근입니다.');
    }
  };

  return (
    <div>
      <NavBarBasic Back={true} Text={'신고하기'} NoRightItem={true} />
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
