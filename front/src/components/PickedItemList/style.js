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
  width: 2%;
`;

const PickedContentWrapper = styled(FlexDiv)`
  overflow: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PickedText = styled.span`
  ${({ textPointer }) => css`
    color: var(--icon-color);
    font-weight: 700;
    cursor: ${textPointer ? 'pointer' : 'default'};
    padding-left: 1em;
  `}
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
    margin-left: 0.7em;
  `}
`;

export {
  PickedTitle,
  PickedDivision,
  PickedContentWrapper,
  PickedText,
  PickedIconBtn,
};
