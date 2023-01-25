import styled from 'styled-components';

export const BoxGrad = styled.div`
  background: linear-gradient(${(props) => props.color || '#A9D7D0'}, #ffffff);
  border-radius: ${(props) => props.radius || '50px'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;
