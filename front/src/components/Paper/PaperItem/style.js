import styled from 'styled-components';
import { BoxLT50 } from '../../common/BoxLT50/BoxLT50';
import { BtnSymptom } from '../../PickSymptom/style';

const BoxPaper = styled(BoxLT50)`
  border-radius: 50px 25px 25px 25px;
  background-color: var(--gray-color);
  margin-bottom: 1.2em;
  cursor: pointer;
  z-index: 1;
  height: auto;
  overflow: hidden;
`;

const BoxTop = styled.div`
  display: flex;
`;

const BoxLeft = styled.div`
  position: relative;
  text-align: center;
  img {
    cursor: pointer;
  }
  span {
    visibility: hidden;
    width: 5em;
    background-color: var(--gray-color);
    color: var(--main-color);
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    bottom: 90%;
    left: 50%;
    margin-left: -2.5em;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    /* z-index: 1; */
  }

  :hover span {
    visibility: visible;
  }
`;

const BoxRight = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  flex: 1;
`;

const BoxSymptomList = styled.div`
  /* overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`;

const Symptom = styled(BtnSymptom)`
  display: inline-block;
  width: auto;
  background-color: var(--light-color);
  padding: 0.2em 0.5em;
`;

const BoxContent = styled.div`
  padding: 0.5em 0.3em 0.7em;
  line-height: 1.5em;
  color: var(--icon-color);
`;

const BoxBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SpanDate = styled.span`
  font-weight: 400;
  color: var(--icon-color);
  font-size: 13px;
  margin-left: 0.2em;
  line-height: 1rem;
  vertical-align: middle;
`;

export {
  BoxPaper,
  BoxTop,
  BoxLeft,
  BoxRight,
  BoxSymptomList,
  Symptom,
  BoxContent,
  BoxBottom,
  SpanDate,
};
