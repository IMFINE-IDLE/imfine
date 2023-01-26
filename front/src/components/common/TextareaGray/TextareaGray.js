import styled, { css } from 'styled-components';

export const TextareaGray = styled.textarea`
  ${({ width, height, margin }) => css`
    border: 0;
    background-color: #f8faf9;
    border-radius: 25px;
    outline: none;
    padding: 20px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    margin: ${margin || '0'};
    resize: none;
  `}
`;
