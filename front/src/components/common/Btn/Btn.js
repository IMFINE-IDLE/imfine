import { css } from 'styled-components';

// 스타일 상속시켜서 사용할 것!
export const Btn = ({
  color,
  fontColor,
  fontSize,
  width,
  height,
  padding,
  margin,
  radius,
}) => css`
  background-color: ${color
    ? 'var(--' + color + '-color)'
    : 'var(--main-color)'};
  color: ${color === 'light' || color === 'gray'
    ? fontColor || 'var(--icon-color)'
    : fontColor || '#ffffff'};
  border-radius: ${radius || '25px'};
  width: ${width || '100%'};
  height: ${height || '100%'};
  padding: ${padding || '1.5em'};
  margin: ${margin || '1.5em'};
  text-align: center;
  font-size: ${fontSize || '1.5em'};
`;
