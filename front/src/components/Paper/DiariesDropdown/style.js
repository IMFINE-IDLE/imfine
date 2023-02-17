import styled from 'styled-components';
import { DropDownR25 } from '../../common/DropDownR25/DropDownR25';
import { InputGray } from '../../common/InputGray/InputGray';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--main-color);
`;

const SelectContainer = styled.select`
  position: relative;
  width: 100%;
  height: 3em;
  border-radius: 8px;
  background: url('/assets/icons/chevron-down.png') calc(100% - 5px) center
    no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
  border-width: 0;
  padding-left: 1em;
  background-color: var(--light-color);

  appearance: none;
  &::-o-appearance {
    none;
  }
  &::-webkit-appearance {
    none;
  }
  &::-moz-appearance {
    none;
  }
  &::appearance {
    none;
  }
  &:hover {
    border-color: var(--main-color);
  }
`;

const Options = styled.option`
  box-sizing: border-box;
  list-style-type: none;
  width: 100%;
  border-radius: 25px;
  background: #f8faf9;
  margin-top: 1em;
`;

export { CenterDiv, SelectContainer, Options };
