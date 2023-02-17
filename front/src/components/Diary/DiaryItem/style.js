import styled, { css } from 'styled-components';

const DiaryItemContainer = styled.div`
  width: 30%;
  cursor: pointer;
  position: relative;
`;

const DiaryItemPrivate = styled.div`
  width: 100%;
  height: 10em;
  position: absolute;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DiaryPrivateLockImg = styled.img.attrs({
  src: `/assets/icons/lockgray.svg`,
})`
  height: 3em;
  width: 3em;
  position: absolute;
  top: calc(50% - 2.5em);
  left: calc(50% - 1.5em);
`;

const DiaryItemSpan = styled.span`
  ${({ fontSize, padding, color }) => css`
    color: ${color ? 'var(--' + color + '-color)' : 'var(--gray800-color)'};
    font-size: ${fontSize || '1em'};
    font-weight: 700;
    padding: ${padding || '0'};
    white-space: nowrap;
  `}
`;

export {
  DiaryItemContainer,
  DiaryItemPrivate,
  DiaryPrivateLockImg,
  DiaryItemSpan,
};
