import styled, { css } from 'styled-components';
import { BoxLT50 } from '../common/BoxLT50/BoxLT50';
import { Btn } from '../common/Btn/Btn';

const TabContainer = styled(BoxLT50)`
  position: relative;
  top: ${(props) => props.minusTop || '-3.125em'};
  background-color: #ffffff;
`;

const TabBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabBtn = styled.button`
  ${Btn}
  ${({ width, height, fontColor, radius }) => css`
    width: ${width || '8.75em'};
    height: ${height || '3.125em'};
    padding: 0;
    color: ${fontColor || 'var(--gray800-color)'};
    font-weight: 700;
    position: relative;
    top: ${height
      ? 'calc(-1em - ' + height.split('em')[0] / 2 + 'em)'
      : '-2.5625em'};
    border-radius: ${radius};
  `}
`;

const TabContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export { TabContainer, TabBtnContainer, TabBtn, TabContentContainer };
