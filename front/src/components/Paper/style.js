import styled from 'styled-components';
import { BoxLT50 } from '../common/BoxLT50/BoxLT50';

const BoxPaper = styled(BoxLT50)`
  border-radius: 50px 25px 25px 25px;
  background-color: var(--gray-color);
  margin-bottom: 1.2em;
  cursor: pointer;
  z-index: 1;
`;

const BoxLikeCmt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SpanLikeCmt = styled.label`
  font-weight: 400;
  color: var(--icon-color);
  margin: 0 0.4em;
`;

export { BoxPaper, BoxLikeCmt, SpanLikeCmt };
