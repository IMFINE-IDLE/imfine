import styled from 'styled-components';

const BoxBtnFloat = styled.div`
  position: fixed;
  width: 60%;
  max-width: 320px;
  bottom: 90px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const CircleFloat = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export { BoxBtnFloat, CircleFloat };
