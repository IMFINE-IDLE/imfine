import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCode } from '../../store/slice/userInfoSlice';
import { CloverWrap } from './style';
import { Clover } from '../common/Clover/Clover';

const CloverModal = ({ setCurrentClover, setCloversOpen }) => {
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
  const state = useSelector((state) => state);
  // console.log(state);

  const cloverList = statusList.map((status, idx) => (
    <li key={idx}>
      <Clover
        code={status[0]}
        pointer={true}
        onClick={() => {
          setCurrentClover(status[0]);
          setCloversOpen((prev) => !prev);
          dispatch(updateCode(status[0]));
        }}
      />
      <span>{status[1]}</span>
    </li>
  ));

  return <CloverWrap>{cloverList}</CloverWrap>;
};

export default CloverModal;
