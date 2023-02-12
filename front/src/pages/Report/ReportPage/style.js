import styled from 'styled-components';
import { BoxGrad } from '../../../components/common/BoxGrad/BoxGrad';
import { Btn } from '../../../components/common/Btn/Btn';
const BoxInnerReport = styled.div`
  background: linear-gradient(var(--main-color), #ffffff 50%);
  border-radius: 50px;
  width: 100%;
  height: 100%;
  padding: 1em;
  margin: 0;
  padding: 1em 2.3em 0;
  margin: 0;
`;

const Label = styled.label`
  font-weight: 700;
  display: inline-block;
  margin: 1.5em 0 0.7em;
`;

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

const BtnUpdate = styled.button`
  ${Btn}

  margin-top: 1em;
  display: inline-block;
`;
export {
  BoxInnerReport,
  Label,
  CenterDiv,
  SelectContainer,
  Options,
  BtnUpdate,
};
