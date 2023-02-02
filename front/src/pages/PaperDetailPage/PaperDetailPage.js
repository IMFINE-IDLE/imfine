import React from 'react';
import { useParams } from 'react-router-dom';

function PaperDetailPage() {
  const { paperId } = useParams();
  return (
    <div>
      PaperDetail
      <div>{paperId}번 일기 상세</div>
    </div>
  );
}

export default PaperDetailPage;
