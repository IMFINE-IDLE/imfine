import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import api from '../../api/api';
import { updateCode } from '../../store/slice/userInfoSlice';
import { Clover } from '../common/Clover/Clover';
import { CloverStatusContainer, CloverWrap } from './style';

const CloverModal = ({
  date,
  currentClover,
  setCurrentClover,
  setCloversOpen,
  fetchProfileCalendar,
  isCenter,
}) => {
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

  // props로 받은 date 날짜의 컨디션 변경
  const updateCondition = (newCondition) => {
    fetchUpdateCondition(newCondition); // 서버에 유저의 새로운 컨디션 저장
    setCurrentClover(newCondition); // 클로버 상태 업데이트
    setCloversOpen((prev) => !prev); // 클로버 선택 모달 닫기

    if (date.getDate() !== new Date().getDate()) return; // 날짜가 오늘일 경우에만
    dispatch(updateCode(newCondition)); // 유저의 오늘 컨디션 store에 저장
  };

  // api 요청: props로 받은 date 날짜의 컨디션 변경
  const fetchUpdateCondition = async (newCondition) => {
    try {
      // 컨디션 최초 설정이면 post 요청, 수정이면 put 요청
      const method = currentClover === '-1' ? 'post' : 'put';
      console.log('method', method);
      console.log('newcon', newCondition);
      console.log('date', date);

      await axios({
        method: method,
        url: api.user.setCondition(),
        data: {
          date: moment(date).format('YYYY-MM-DD'),
          condition: newCondition,
        },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });

      // 변경되었으니 달력 재렌더링
      fetchProfileCalendar(date);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CloverStatusContainer
      width="18.75em"
      height="11em"
      radius="25px"
      shadX="0"
      shadY="0"
      isCenter={isCenter}
    >
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
    </CloverStatusContainer>
  );
};

export default CloverModal;
