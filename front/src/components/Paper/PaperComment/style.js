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

const DivUser = styled.div`
  position: relative;
  font-weight: 700;
  margin-right: 0.3em;
  cursor: pointer;
  span {
    visibility: hidden;
    width: 5em;
    font-weight: 500;
    background-color: white;
    color: var(--main-color);
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    left: 2.2em;
    bottom: 1.5em;
    margin-left: -2.5em;
    position: absolute;
  }
  :hover span {
    visibility: visible;
  }
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

export { BoxCommentItem, BoxTop, BoxUser, DivUser, BoxBtns, BoxContent };
