import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const DiaryFeedFilterSvg = styled.img.attrs({
  src: '/assets/icons/filter.svg',
})`
  position: relative;
  left: 1.5em;
`;

const DiaryFeedBtn = styled.button`
  ${Btn}
`;

export { DiaryFeedFilterSvg, DiaryFeedBtn };
