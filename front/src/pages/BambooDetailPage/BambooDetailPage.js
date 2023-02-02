import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import BoxLeavesFeed from '../../components/Bamboo/BoxLeavesFeed/BoxLeavesFeed';
// 댓글리스트 보여줄 컴포넌트 import 해오기
// 해뜨면 까먹을까봐 일단 주석으로 정리
// 강의실에서 작업할때 주석 지우기...

function BambooDetailPage() {
  const params = useParams();

  const [Bamboo, setBamboo] = useState([]);
  useEffect(() => {});
  return (
    <>
      <NavBarBasic Back={true} Text={''} />
      <BambooDetailHeader
        content={
          'test입니다.test입니다test입니다test입니다test입니다test입니다test입니다test입니다test입니다test입니다test입니다test입니다test입니다'
        }
      />
    </>
  );
}

export default BambooDetailPage;
