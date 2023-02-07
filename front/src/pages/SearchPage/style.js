import styled from 'styled-components';

const BoxRecentQuery = styled.div`
  margin-top: calc(12vh - 75px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxClover = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5em;
`;

const TitleRecent = styled.h2`
  color: white;
  font-size: 1.5em;
  font-weight: 700;
`;

const BoxInner = styled.div`
  width: 90%;
  padding: 2em 3em 6em;
`;

const QueryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
  color: var(--icon-color);
`;

export { BoxRecentQuery, BoxClover, TitleRecent, BoxInner, QueryItem };
