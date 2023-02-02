import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItemDetail from '../../components/Paper/PaperItemDetail/PaperItemDetail';

function PaperDetailPage() {
  const { paperId } = useParams();
  // const [paper, setPaper] = useState(null);
  // useEffect(() => {
  //   const fetchPaperDetail = async () => {
  //     const res = await axios.get(api.paper.paperDetail(paperId));
  //     setPaper(res.data.data);
  //   };
  //   fetchPaperDetail();
  // }, []);

  return (
    <>
      <NavBarBasic Back />
      <PaperItemDetail
        condition={0}
        name={'닉네임'}
        title={'나의 항암 일기'}
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
