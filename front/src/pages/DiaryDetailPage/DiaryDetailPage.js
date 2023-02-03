import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';

const DiaryDetailPage = () => {
  const { diaryId } = useParams();
  const [diaryInfo, setDiaryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchGetDiaryInfo();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!diaryInfo) return null;

  return (
    <>
      <NavBarBasic Back={true} />
      <BoxShad>
        <span>title: {diaryInfo.title}</span> <br />
        <span>description: {diaryInfo.description}</span> <br />
        <span>userName: {diaryInfo.userName}</span> <br />
      </BoxShad>

      {/* <StatusCalendar uid={diaryInfo.userId} /> */}
      <StatusCalendar uid={'user12'} />
    </>
  );
};

export default DiaryDetailPage;
