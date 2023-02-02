import styled from 'styled-components';
import { BoxLT50 } from '../../common/BoxLT50/BoxLT50';
import { BtnSymptom } from '../../PickSymptom/style';

const BoxPaper = styled(BoxLT50)`
  border-radius: 50px 25px 25px 25px;
  background-color: var(--gray-color);
  margin-bottom: 1.2em;
  cursor: pointer;
  z-index: 1;
`;

const BoxTop = styled.div`
  display: flex;
`;

const BoxLeft = styled.div`
  text-align: center;
`;

const BoxRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
`;

const Symptom = styled(BtnSymptom)`
  display: inline;
  width: auto;
  background-color: var(--light-color);
`;

const BoxContent = styled.div`
  padding: 1em 0;
  line-height: 1.2em;
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
  font-size: 14px;
  margin-left: 0.2em;
`;

export {
  BoxPaper,
  BoxTop,
  BoxLeft,
  BoxRight,
  Symptom,
  BoxContent,
  BoxBottom,
  SpanDate,
};
