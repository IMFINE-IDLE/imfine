import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { BoxBottom } from '../PaperItem/style';

const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 200px;
`;

const BoxBottomDetail = styled(BoxBottom)`
  color: var(--icon-color);
  justify-content: space-between;
  /* justify-content: ${(props) =>
    props.userStatus ? 'space-between' : 'flex-end'}; */
`;

const BoxBottemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.3em;
`;

export { BoxPaperDetail, BoxBottomDetail, BoxBottemLeft };
