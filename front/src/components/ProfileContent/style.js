import styled from 'styled-components';
import { BoxLT50 } from '../common/BoxLT50/BoxLT50';
import { Btn } from '../common/Btn/Btn';

const ProfileContentContainer = styled(BoxLT50)`
  position: relative;
  top: -1em;
  background-color: #ffffff;
`;

const ProfileContentTabBtn = styled.button`
  ${Btn}
  width: 8.75em;
  height: 3.125em;
  padding: 0;
  color: var(--default-font-color);
  font-weight: 700;
  position: relative;
  top: -2.5625em;
`;

export { ProfileContentContainer, ProfileContentTabBtn };
