import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import { DiaryBoxGrad } from '../DiaryCreatePage/style';
import { DiaryInfoContainer, DiaryDateSpan } from './style';
import DiaryTitle from '../../components/Paper/DiaryTitle/DiaryTitle';
import { ReactComponent as BookmarkSvg } from './bookmark.svg';
import PickedItemList from '../../components/PickedItemList/PickedItemList';
import SymptomGraph from '../../components/SymptomGraph/SymptomGraph';

const DiaryDetailPage = () => {
  const { diaryId } = useParams();
  const [diaryInfo, setDiaryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const fetchGetDiaryInfo = async () => {
    try {
      setError(null);
      setDiaryInfo(null);
      setLoading(true);

      const res = await axios.get(api.diary.getDiaryInfo(diaryId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      console.log(res.data.data);
      setDiaryInfo(res.data.data);

      // const {
      //   data: {
      //     data: {
      //       userId,
      //       userStatus,
      //       title,
      //       description,
      //       userName,
      //       medicalName,
      //       beginDate,
      //       endedDate,
      //       diaryHasSymptoms,
      //     },
      //   },
      // } = res;
      // console.log('title', title);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const fetchUpdateSubscribeStatus = async (status) => {
    try {
      const fetchUrl = status
        ? api.diary.deleteDiarySubscribe()
        : api.diary.setDiarySubscribe(status);
      const method = status ? 'delete' : 'post';
      const res = await axios({
        url: fetchUrl,
        method: method,
        data: { diaryId: diaryId },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });

      console.log('bookmark', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetDiaryInfo();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!diaryInfo) return null;

  // const isMine = diaryInfo.uid === localStorage.getItem('uid') ? true : false;
  const isMine = false;

  const medicalList = [
    {
      medicalId: 1,
      medicalName: `${diaryInfo.medicalName}`,
    },
  ];
  const diaryHasSymptoms = [
    {
      symptomId: 16,
      symptomName: '두통',
    },
    {
      symptomId: 17,
      symptomName: '어지러움',
    },
    {
      symptomId: 18,
      symptomName: '어지러움',
    },
    {
      symptomId: 19,
      symptomName: '어지러움',
    },
    {
      symptomId: 14,
      symptomName: '어지러움',
    },
    {
      symptomId: 15,
      symptomName: '어지러움',
    },
  ];

  return (
    <>
      <NavBarBasic Back={true} />
      <DiaryBoxGrad radius="0">
        <DiaryInfoContainer radius="25px">
          <FlexDiv justify="space-between">
            <DiaryTitle title={diaryInfo.title} />
            <FlexDiv width="4em" justify="space-between">
              {isMine ? (
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  style={{ padding: '0.8125em 0' }}
                />
              ) : (
                <BookmarkSvg
                  onClick={(e) => {
                    e.preventDefault();
                    fetchUpdateSubscribeStatus(diaryInfo.subscribe);
                    // setDiaryInfo({subscribe} => !prev.subscribe);
                  }}
                  fill={
                    diaryInfo.subscribe
                      ? 'var(--main-color)'
                      : 'var(--gray-color)'
                  }
                  stroke={
                    diaryInfo.subscribe
                      ? 'var(--main-color)'
                      : 'var(--gray800-color)'
                  }
                  style={{ position: 'relative', top: '-1.5px' }}
                />
              )}
              <img src="/assets/icons/more-vertical.svg" alt="more" />
            </FlexDiv>
          </FlexDiv>
          <FlexDiv direction="column">
            <PickedItemList
              title="작성자"
              isIcon={false}
              type="text"
              text={diaryInfo.name}
            />
            <PickedItemList
              title="질병/수술"
              isIcon={true}
              type="medical"
              medicals={medicalList}
            />
            <PickedItemList
              title="증상"
              isIcon={true}
              type="symptom"
              symptoms={diaryHasSymptoms}
              canModify={true}
              color="light-pink"
            />
          </FlexDiv>
          <FlexDiv>
            {/* <FlexDiv width="50%"> */}
            <DiaryDateSpan width="15%" bold={true}>
              시작일
            </DiaryDateSpan>
            <DiaryDateSpan width="35%">{diaryInfo.beginDate}</DiaryDateSpan>
            <DiaryDateSpan width="15%" bold={true}>
              종료일
            </DiaryDateSpan>
            <DiaryDateSpan width="35%">
              {diaryInfo.endDate || '-'}
            </DiaryDateSpan>
          </FlexDiv>
          {/* <FlexDiv>{diaryInfo.description}</FlexDiv> */}
          <DiaryDateSpan textAlign="start" padding="0 0.2em">
            {diaryInfo.description || '일기장 설명이 없어요'}
          </DiaryDateSpan>
        </DiaryInfoContainer>

        <FlexDiv height="1.25em" justify="end" margin="1em 0 0.5em 0">
          <DiaryDateSpan
            onClick={() => setShowGraph((prev) => !prev)}
            pointer={true}
          >
            증상 추이 보기
            <img
              src={`/assets/icons/chevron-${showGraph ? 'up' : 'down'}.svg`}
              alt="show graph"
              style={{
                paddingLeft: '0.3em',
                position: 'relative',
                top: '-0.15em',
              }}
            />
          </DiaryDateSpan>
        </FlexDiv>
        {showGraph && (
          <BoxShad radius="25px" height="15em" margin="0 0 1.5em 0">
            <SymptomGraph />
          </BoxShad>
        )}

        <StatusCalendar uid={'user12'} />
        {/* <StatusCalendar uid={diaryInfo.uid} /> */}
      </DiaryBoxGrad>
    </>
  );
};

export default DiaryDetailPage;
