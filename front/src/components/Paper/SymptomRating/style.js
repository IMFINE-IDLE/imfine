import styled from 'styled-components';
import { BoxShad } from '../../common/BoxShad/BoxShad';
import { Btn } from '../../common/Btn/Btn';

const BoxSymptomRating = styled(BoxShad)`
  margin: 0 auto;
  margin-bottom: 1em;
  padding: 1em 2em;
`;

const DivSymptom = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  & + & {
    margin-top: 1em;
  }
  align-items: center;
`;

const LabelSymptom = styled.span`
  ${Btn}
  display: inline-block;
  max-width: 6.2em;
  padding: 0.3em;
`;

const RateSymptom = styled.div`
  display: inline-block;
  max-width: 7em;
`;

export { BoxSymptomRating, DivSymptom, LabelSymptom, RateSymptom };
