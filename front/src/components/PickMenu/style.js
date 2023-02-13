import styled, { css } from 'styled-components';
import { BoxRT25 } from '../common/BoxRT25/BoxRT25';
import { BoxRT50LB50 } from '../common/BoxRT50LB50/BoxRT50LB50';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';

const PickMenuTabContainer = styled(FlexDiv)`
  position: relative;
  padding-bottom: 3em;
`;

const PickMenuTabLeft = styled(BoxRT25)`
  ${({ fontColor }) => css`
    position: absolute;
    right: 50%;
    z-index: 1;
    width: 50%;
    height: 3.125em;
    line-height: 3.125em;
    padding: 0;
    text-align: center;
    color: ${fontColor || 'var(--gray800-color)'};
    font-weight: 700;
  `}
`;

const PickMenuTabRight = styled(BoxRT25)`
  ${({ fontColor }) => css`
    position: absolute;
    right: 0;
    width: calc(50% + 25px);
    height: 3.125em;
    line-height: 3.125em;
    padding: 0;
    text-align: center;
    color: ${fontColor || 'var(--gray800-color)'};
    font-weight: 700;
  `}
`;
const PickMenuRowContainer = styled.section`
  padding-bottom: 1em;
`;

const PickMenuSubListContainer = styled(BoxRT50LB50)`
  display: none;
`;

const PickMenuDetailMenu = styled.span`
  width: 45%;
  font-size: 0.8em;
`;

// const TabBtn = styled.button`
//   ${Btn}
//   ${({ width, height, fontColor }) => css`
//     width: ${width || '8.75em'};
//     height: ${height || '3.125em'};
//     padding: 0;
//     color: ${fontColor || 'var(--gray800-color)'};
//     font-weight: 700;
//     position: relative;
//     top: ${height
//       ? 'calc(-1em - ' + height.split('em')[0] / 2 + 'em)'
//       : '-2.5625em'};
//   `}
// `;

const TabContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoxPickMenu = styled.div`
  width: 100%;
  margin-top: -2.5em;
  padding: 0 1em 1em;
  /* background-color: var(--gray-color); */
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  /* align-items: center; */
`;

export {
  PickMenuTabContainer,
  PickMenuTabLeft,
  PickMenuTabRight,
  PickMenuRowContainer,
  PickMenuSubListContainer,
  PickMenuDetailMenu,
  TabContentContainer,
  BoxPickMenu,
};
