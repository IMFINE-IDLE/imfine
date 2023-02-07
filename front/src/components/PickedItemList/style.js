import styled, { css } from 'styled-components';
import { Btn } from '../common/Btn/Btn';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';

const PickedTitle = styled.span`
  color: var(--gray800-color);
  font-weight: 800;
  text-align: center;
  width: 20%;
  min-width: 5em;
`;

const PickedDivision = styled.span`
  color: var(--gray800-color);
  text-align: center;
  width: 5%;
`;

const PickedContentWrapper = styled(FlexDiv)`
  overflow: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PickedText = styled.span`
  color: var(--icon-color);
  font-weight: 700;
`;

const PickedIconBtn = styled.button`
  ${({ color, pointer }) => css`
    ${Btn}
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: var(--icon-color);
    font-weight: 700;
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--main-color)'};
    padding: 0.1em 0.7em;
    cursor: ${pointer ? 'pointer' : 'default'};
    width: auto;
    margin-right: 0.7em;
  `}
`;

export {
  PickedTitle,
  PickedDivision,
  PickedContentWrapper,
  PickedText,
  PickedIconBtn,
};
