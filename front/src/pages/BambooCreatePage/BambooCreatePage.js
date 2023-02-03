import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TextareaGray from '../../components/common/TextareaGray/TextareaGray';

import { DivTextArea, BtnUpdate } from './style';

function BambooCreatePage() {
  const [value, setValue] = useState('');

  const fetchPost = async () => {
    console.log(value);
    try {
      await axios.post(
        api.bamboo.postBamboo(),
        {
          content: value,
        },
        { headers: { 'X-AUTH-TOKEN': localStorage.getItem('accessToken') } }
      );
    } catch (err) {
      console.log('Err', err);
    }
  };

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
          width={'23em'}
          margin={'1em'}
          value={value}
          setValue={setValue}
        />
      </DivTextArea>
      <DivTextArea>
        <BtnUpdate onClick={fetchPost}> 대나무 숲에 외치기</BtnUpdate>
      </DivTextArea>
    </>
  );
}

export default BambooCreatePage;
