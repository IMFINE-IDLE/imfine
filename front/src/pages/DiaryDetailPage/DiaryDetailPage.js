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

  // const fetchUpdateBookmarkStatus = async (status) => {
  //   try {
  //     const fetchUrl = status
  //       ? api.diary.deleteDiaryBookmark()
  //       : api.diary.setDiaryBookmark(status);
  //     const method = status ? 'delete' : 'post';
  //     const res = await axios({
  //       url: fetchUrl,
  //       method: method,
  //       data: { diaryId: diaryId },
  //       headers: {
  //         Authorization: localStorage.getItem('accessToken'),
  //       },
  //     });

  //     console.log('bookmark', res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    fetchGetDiaryInfo();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!diaryInfo) return null;

  // const isMine = diaryInfo.uid === localStorage.getItem('uid') ? true : false;
  const isMine = false;
  let bookmark = false;
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
                    // fetchUpdateBookmarkStatus(diaryInfo.bookmark);
                    // fetchUpdateBookmarkStatus(bookmark);
                    // bookmark = !bookmark;
                    // setDiaryInfo({bokkmark} => !bookmark);
                  }}
                  fill={bookmark ? 'var(--main-color)' : 'var(--gray-color)'}
                  stroke={
                    bookmark ? 'var(--main-color)' : 'var(--gray800-color)'
                  }
                  style={{ position: 'relative', top: '-1.5px' }}
                />
              )}
              <img src="/assets/icons/more-vertical.svg" alt="more" />
              {/* {bookmark ? 'bookmark true' : 'bookmark false'} */}
            </FlexDiv>
          </FlexDiv>
          <FlexDiv direction="column">
            <PickedItemList
              title="작성자"
              isIcon={false}
              text={diaryInfo.userName}
            />
            <PickedItemList />
            <PickedItemList />
          </FlexDiv>
          <FlexDiv>
            {/* <FlexDiv width="50%"> */}
            <DiaryDateSpan width="15%" bold={true}>
              시작일
            </DiaryDateSpan>
            <DiaryDateSpan width="35%">{diaryInfo.beginDate}</DiaryDateSpan>
            <DiaryDateSpan width="15%">종료일</DiaryDateSpan>
            <DiaryDateSpan width="35%">
              {diaryInfo.endDate || '-'}
            </DiaryDateSpan>
            {/* <span>시작일</span>
              <span>{diaryInfo.beginDate}</span>
            </FlexDiv>
            <FlexDiv width="50%">
              <span>종료일</span>
              <span>{diaryInfo.endDate || '-'}</span>
            </FlexDiv> */}
          </FlexDiv>
          <FlexDiv>{diaryInfo.description}</FlexDiv>
          <DiaryDateSpan>{diaryInfo.description}</DiaryDateSpan>
        </DiaryInfoContainer>

        <span
          onClick={() => setShowGraph((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        >
          증상 추이 보기 {showGraph ? 'show' : 'no show'}
        </span>
        {showGraph && <BoxShad>'show'</BoxShad>}

        <StatusCalendar uid={'user12'} />
        {/* <StatusCalendar uid={diaryInfo.uid} /> */}
      </DiaryBoxGrad>
    </>
  );
};

export default DiaryDetailPage;
