import styled from 'styled-components';

export const BoxNoShad = styled.div`
  background-color: ${(props) => props.color || '#F8FAF9'};
  border-radius: ${(props) => props.radius || '25px'};
  border: none;
  padding: 24px;
  margin: 24px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
