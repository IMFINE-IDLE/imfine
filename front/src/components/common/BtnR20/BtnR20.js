import styled, { css } from 'styled-components';

export const BtnR20 = styled.button`
  ${({ color, fontColor, fontSize, width, height, padding, margin }) => css`
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--main-color)'};
    color: ${fontColor || '#ffffff'};
    border-radius: 20px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '1.5em'};
    margin: ${margin || '1.5em'};
    text-align: center;
    font-size: ${fontSize || '1.5em'};
  `}
`;
