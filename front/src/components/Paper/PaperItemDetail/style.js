import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { BoxBottom } from '../PaperItem/style';

const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 200px;
`;

const BoxBottomDetail = styled(BoxBottom)`
  justify-content: ${(props) =>
    props.userStatus ? 'space-between' : 'flex-end'};
`;

export { BoxPaperDetail, BoxBottomDetail };
