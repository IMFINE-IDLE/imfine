import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';
import { resDetail } from './tmp';

function PaperDetailPage() {
  const { paperId } = useParams();
  const [paperDetail, setPaperDetail] = useState({});
  // const fetchPaperDetail = async () => {
  //   console.log('실행');
  //   try {
  //     const res = await axios.get(api.paper.paperDetail(paperId), {
  //       headers: localStorage.getItem('accessToken'),
  //     });
  //     console.log(res.data);
  //     setPaper(res.data.data);
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // };

  useEffect(() => {
    // fetchPaperDetail();
    setPaperDetail(resDetail.data);
  }, []);

  // 내 게시글인지 여부
  // const userId = useSelector((state) => {
  //   return state.user.uid;
  // });
  // const uid = localStorage.getItem('uid');
  // const isMine = Boolean(paper.userId === uid);

  return (
    <>
      <NavBarBasic Back />
      <PaperItemDetail isMine={true} paper={paperDetail} paperId={paperId} />
    </>
  );
}

export default PaperDetailPage;
