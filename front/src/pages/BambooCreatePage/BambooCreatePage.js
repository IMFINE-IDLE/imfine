import React, { useState, useEffect } from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TextareaGray from '../../components/common/TextareaGray/TextareaGray';
import { DivTextArea } from './style';

function BambooCreatePage() {
  const [value, setValue] = useState('');

  return (
    <>
      <NavBarBasic Back={true} Text={''} />
      <BambooHeader
        title={'대나무숲 외치기'}
        subTitle={'비밀대나무는'}
        secondSubTitle={'24시간 뒤에 사라져요.'}
        bottom={'1em'}
      />
      <DivTextArea>
        <TextareaGray
          width={'20em'}
          margin={'1em'}
          value={value}
          setValue={setValue}
        />
      </DivTextArea>
    </>
  );
}

export default BambooCreatePage;
