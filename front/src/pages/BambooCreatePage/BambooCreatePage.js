import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TextareaGray from '../../components/common/TextareaGray/TextareaGray';
import { useNavigate } from 'react-router-dom';
import { DivTextArea, BtnUpdate } from './style';

function BambooCreatePage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const fetchPost = async () => {
    console.log(value);
    try {
      await axios.post(
        api.bamboo.postBamboo(),
        {
          content: value,
        },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      navigate(-1);
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <>
      <NavBarBasic
        BackgroundColor={'light'}
        TextColor={'icon'}
        Back={true}
        Text={'대나무 작성'}
      />
      <BambooHeader
        bottomValue={'3em'}
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
          maxLength={300}
        />
      </DivTextArea>
      <DivTextArea>
        <BtnUpdate onClick={fetchPost}> 대나무 숲에 외치기</BtnUpdate>
      </DivTextArea>
    </>
  );
}

export default BambooCreatePage;
