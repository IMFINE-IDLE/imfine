import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const FollowUserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
`;

const FollowUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FollowUserBtn = styled.button`
  ${Btn}
  width: 6.5em;
  height: 3em;
  padding: 0;
  color: var(--icon-color);
`;

export { FollowUserContainer, FollowUserWrapper, FollowUserBtn };
