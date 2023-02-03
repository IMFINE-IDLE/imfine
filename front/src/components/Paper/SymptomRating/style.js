import styled from 'styled-components';
import { BoxShad } from '../../common/BoxShad/BoxShad';
import { Btn } from '../../common/Btn/Btn';

const BoxSymptomRating = styled(BoxShad)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  padding: 1em 2em;
`;

const DivSymptom = styled.div`
  display: flex;
  gap: 1em;
  & + & {
    margin-top: 1em;
  }
  align-items: center;
`;

const LabelSymptom = styled.span`
  ${Btn}
  display: inline-block;
  padding: 0.3em;
  flex: 1;
`;

const RateSymptom = styled.span`
  flex: 3;
`;

export { BoxSymptomRating, DivSymptom, LabelSymptom, RateSymptom };
