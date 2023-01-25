import styled from 'styled-components';

export const BoxShad = styled.div`
  background-color: ${(props) => props.color || '#F8FAF9'};
  border-radius: ${(props) => props.radius || '50px'};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
