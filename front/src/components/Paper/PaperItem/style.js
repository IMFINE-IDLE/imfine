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

const BtnDiary = styled(BtnSymptom)`
  background-color: var(--main-color);
  padding: 0.1em 0.3em 0 0;
  font-weight: 700;
  font-size: 1rem;
`;

const Symptom = styled(BtnSymptom)`
  display: inline;
  width: auto;
  background-color: var(--light-color);
`;

const BoxContent = styled.div`
  padding: 1em 0;
  line-height: 1.2em;
`;

const BoxLikeCmt = styled.div`
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

const SpanLikeCmt = styled.label`
  font-weight: 400;
  color: var(--icon-color);
  margin: 0 0.4em;
`;

export {
  BoxPaper,
  BoxTop,
  BoxLeft,
  BoxRight,
  BtnDiary,
  Symptom,
  BoxContent,
  BoxLikeCmt,
  SpanDate,
  SpanLikeCmt,
};
