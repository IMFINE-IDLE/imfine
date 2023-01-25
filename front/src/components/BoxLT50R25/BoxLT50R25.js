import styled from 'styled-components';

export const BoxLT50R25 = styled.div`
  background-color: ${(props) => props.color || '#F8FAF9'};
  border-radius: 50px 25px 25px 25px;
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
