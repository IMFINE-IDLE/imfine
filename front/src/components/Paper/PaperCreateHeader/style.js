import styled from 'styled-components';

import { InputGray } from '../../common/InputGray/InputGray';

const Title = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1.5em;
  background-color: var(--main-color);
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  line-height: 2.5em;
  padding-left: 1.2em;
  background-color: var(--main-color);
`;

const SelectContainer = styled.select`
  position: relative;
  width: 100%;
  height: 3em;
  border-radius: 8px;
  background: var(--gray-color);
  cursor: pointer;
  border-width: 0;
`;

const Options = styled.option`
  box-sizing: border-box;
  list-style-type: none;
  width: 100%;
  border-radius: 25px;
  background: #f8faf9;
  margin-top: 1em;
`;
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--main-color);
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
  background-color: var(--main-color);
`;

export { Title, TopDiv };
