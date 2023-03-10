import styled from 'styled-components';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';

const DivFindResult = styled(FlexDiv)`
  row-gap: 1em;
  width: 80%;
  text-align: center;
  margin: 3em auto 0;
  height: auto;
`;

const SpanUserId = styled.p`
  font-size: 1.5em;
  font-weight: 700;
  color: var(--icon-color);
  margin-bottom: 1em;
`;

export { DivFindResult, SpanUserId };
