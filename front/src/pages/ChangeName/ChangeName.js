import React, { useEffect } from 'react';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { InputGray } from '../../components/common/InputGray/InputGray';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { TitleText, NicknameInput, SubmitBtn } from './style';

const ChangeName = () => {
  // 렌더링할 때 uid로 유저 정보 가져와서 닉네임 input value에 주기
  // const fetchUserInfo = () => {};
  // useEffect(fetchUserInfo(), []);

  return (
    <>
      <NavBarBasic Back={true} Text="닉네임 변경" />
      <BoxGrad radius="0" height="calc(100vh - 71px)" padding="2em">
        <TitleText>변경할 닉네임을 적어주세요</TitleText>
        <form>
          <NicknameInput
          // value={}
          />
          <SubmitBtn
            radius="20px"
            height="3.5em"
            margin="55vh 0 0 0"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              // 닉네임 유효성 검사 (로직)
              // 닉네임 중복 검사 (요청)
              // 닉네임 변경 (요청)
            }}
          >
            변경하기
          </SubmitBtn>
        </form>
      </BoxGrad>
    </>
  );
};

export default ChangeName;
