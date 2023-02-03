import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';

function PaperDetailPage() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  // useEffect(() => {
  //   const fetchPaperDetail = async () => {
  //     const res = await axios.get(api.paper.paperDetail(paperId));
  //     setPaper(res.data.data);
  //   };
  //   fetchPaperDetail();
  // }, []);

  // 내 게시글인지 여부
  // const userId = useSelector((state) => {
  //   return state.user.uid;
  // });
  // const isMine = Boolean(paper.uid === userId);

  return (
    <>
      <NavBarBasic Back />
      <PaperItemDetail
        isMine={true}
        paperId={paperId}
        condition={0}
        name={'닉네임'}
        title={'나의 항암 일기'}
        symptomList={[
          {
            symptomId: 1,
            symptomName: '어지러움',
            score: 1,
          },
          {
            symptomId: 2,
            symptomName: '두통',
            score: 3,
          },
          {
            symptomId: 3,
            symptomName: '최대다섯자',
            score: 5,
          },
        ]}
        content={
          '어떻게 하나요? 블라블라 Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variablethe chosen weight.'
        }
        images={[]}
        likeCount={0}
        commentCount={0}
      />
    </>
  );
}

export default PaperDetailPage;
