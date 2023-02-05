import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';

const BoxCommentItem = styled(BoxNoShad)`
  margin: 1em 0;
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoxUser = styled.div`
  display: flex;
  align-items: center;
`;

const SpanUser = styled.span`
  font-weight: 700;
  margin-right: 0.3em;
`;

const BoxBtns = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray800-color);
`;

const BoxContent = styled.div`
  padding: 0.5em 1.5em;
  color: var(--icon-color);
  line-height: 1.2rem;
`;

export { BoxCommentItem, BoxTop, BoxUser, SpanUser, BoxBtns, BoxContent };
