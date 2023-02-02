import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

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
    <div>
      PaperDetail
      <div>{paperId}번 일기 상세</div>
    </div>
  );
}

export default PaperDetailPage;
