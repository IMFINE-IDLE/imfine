import React from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';

function FindIdPage() {
  return (
    <BoxGrad radius={'0 0 0 0'}>
      <NavBarBasic Text={'아이디 찾기'} Back />
    </BoxGrad>
  );
}

export default FindIdPage;
