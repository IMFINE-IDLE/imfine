import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateCode } from '../../store/slice/userInfoSlice';
import api from '../../api/api';
import { Clover } from '../common/Clover/Clover';
import { CloverWrap } from './style';
import moment from 'moment';

const CloverModal = ({ currentClover, setCurrentClover, setCloversOpen }) => {
  const statusList = [
    ['0', '두근'],
    ['1', '평온'],
    ['2', '활기참'],
    ['3', '행복'],
    ['4', '호기심'],
    ['5', '화나요'],
    ['6', '슬픔'],
    ['7', '우울'],
    ['8', '언짢음'],
    ['9', '피곤함'],
  ];

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => {
    return { accessToken: state.user.accessToken };
  });
  // console.log(state);

  const fetchUpdateCondition = async (newCondition) => {
    try {
      // 컨디션 최초 설정이면 post 요청, 수정이면 put 요청
      const method = currentClover === '-1' ? 'post' : 'put';
      console.log('method', method);

      const res = await axios({
        method: method,
        url: api.user.updateCondition(),
        data: {
          date: moment(new Date()).format('YYYY-MM-DD'),
          condition: newCondition,
        },
        headers: {
          'X-AUTH-TOKEN': accessToken,
        },
      });

      // const res = await axios.post(
      //   api.user.updateCondition(),
      //   {
      //     date: moment(new Date()).format('YYYY-MM-DD'),
      //     // condition: newCondition,
      //   },
      //   {
      //     headers: { 'X-AUTH-TOKEN': state.user.accessToken },
      //   }
      // );

      // setMonthCondition({ ...response.data.data });
      console.log('res', res);
      // console.log('data', monthCondition);
    } catch (e) {
      console.error(e);
    }
  };

  const updateCondition = (newCondition) => {
    console.log('newcond', typeof newCondition, newCondition);

    setCurrentClover(newCondition); // 하단탭 중앙 클로버 변경
    setCloversOpen((prev) => !prev); // 하단탭 클로버 선택 모달 닫기
    fetchUpdateCondition(newCondition); // 서버에 유저의 오늘 컨디션 저장
    dispatch(updateCode(newCondition)); // 유저의 오늘 컨디션 store에 저장
  };

  console.log();

  return (
    <CloverWrap>
      {statusList.map((status, idx) => (
        <li key={idx}>
          <Clover
            code={status[0]}
            pointer={true}
            onClick={() => updateCondition(status[0])}
          />
          <span>{status[1]}</span>
        </li>
      ))}
    </CloverWrap>
  );
};

export default CloverModal;
