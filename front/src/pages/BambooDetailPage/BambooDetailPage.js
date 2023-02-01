import React, { useEffect, useState } from 'react';
import BambooDetailHeader from '../../components/Bamboo/BambooDetailHeader/BambooDetailHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';

import { useParams } from 'react-router-dom';

function BambooDetailPage() {
  const params = useParams();

  const [Bamboo, setBamboo] = useState([]);
  useEffect(() => {});
  return (
    <>
      <NavBarBasic Back={true} Text={''} />
      <BambooDetailHeader content={'test입니다.'} />
    </>
  );
}

export default BambooDetailPage;
