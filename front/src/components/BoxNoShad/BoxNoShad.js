import styled from 'styled-components';
// import React from 'react';

// const BoxNoShad = () => {
//   return <div>BoxNoShad</div>;
// };

export const BoxNoShad = styled.div`
  background-color: ${(props) => props.color || '#F8FAF9'}
  border-radius: ${(props) => props.radius || '25px'};
  border: none;
  padding: 24px;
  margin: 24px;
`;
