import styled from 'styled-components';

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ReplyLabel = styled.label`
  font-weight: 400;
  color: var(--icon-color);
  margin: 0;
`;

const ReplyDiv = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;
export { TopDiv, ReplyLabel, ReplyDiv };
