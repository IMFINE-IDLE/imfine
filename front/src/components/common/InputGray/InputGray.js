import styled, { css } from 'styled-components';

export const InputGray = styled.input`
  ${({ width, height, margin }) => css`
    border: 0;
    background-color: #f8faf9;
    border-radius: 25px;
    outline: none;
    padding: ${(props) => props.padding || '1em'};
    width: ${width || '100%'};
    height: ${height || '100%'};
    margin: ${margin || '0'};
  `}
`;
