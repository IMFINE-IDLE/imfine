import React from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
function BambooCreatePage() {
  return (
    <>
      <NavBarBasic />
      <BambooHeader
        title={'대나무숲 외치기'}
        subTitle={'비밀대나무는'}
        secondSubTitle={'24시간 뒤에 사라져요.'}
      />
    </>
  );
}

export default BambooCreatePage;
