import styled from 'styled-components';
import { BoxNoShad } from '../../components/common/BoxNoShad/BoxNoShad';
const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 100px;
  border-radius: 0px 0px 50px 50px;
  padding: 1em 1em 1em 1em;
  background-color: var(--main-color);
`;

const BoxContent = styled.div`
  padding: 1em 0;
  line-height: 1.2em;
  color: var(--icon-color);
`;

export { BoxPaperDetail, BoxContent };
