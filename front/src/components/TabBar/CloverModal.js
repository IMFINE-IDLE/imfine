import React from 'react';
import { Clover, CloverWrap } from './style';

const CloverModal = ({ setCurrentClover, setCloversOpen }) => {
  const statusList = [
    ['pink', '두근'],
    ['main', '평온'],
    ['yellow', '활기참'],
    ['lightgreen', '행복'],
    ['orange', '호기심'],
    ['red', '화나요'],
    ['lightgray', '슬픔'],
    ['blue', '우울'],
    ['purple', '언짢음'],
    ['darkgray', '피곤함'],
  ];

  const cloverList = statusList.map((status, idx) => (
    <li key={idx}>
      <Clover
        onClick={() => {
          setCurrentClover(status[0]);
          setCloversOpen((prev) => !prev);
        }}
        src={`/assets/clovers/clover-${status[0]}.svg`}
      />
      <span>{status[1]}</span>
    </li>
  ));

  return <CloverWrap>{cloverList}</CloverWrap>;
};

export default CloverModal;
