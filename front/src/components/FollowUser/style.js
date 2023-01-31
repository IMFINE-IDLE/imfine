import styled from 'styled-components';
import { Btn } from '../common/Btn/Btn';

const FollowUserContainer = styled.div`
  width: 100%;
  padding-left: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FollowUserBtn = styled.button`
  ${Btn}
  width: 7.7em;
  height: 3.125em;
`;

export { FollowUserContainer, FollowUserBtn };
