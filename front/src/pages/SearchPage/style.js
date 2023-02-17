import styled from 'styled-components';

const BoxSearchResult = styled.div`
  padding-top: var(--nav-height);
`;

const BoxRecentQuery = styled.div`
  position: relative;
  width: 100%;
  top: calc(var(--nav-height) * 2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxClover = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5em;
  top: var(--nav-height);
  right: 0;
`;

const TitleRecent = styled.h2`
  position: fixed;
  top: calc(var(--nav-height) * 2.5);
  color: white;
  font-size: 1.5em;
  font-weight: 700;
`;

const BoxInner = styled.div`
  position: fixed;
  top: calc(var(--nav-height) * 3);
  width: 90%;
  padding: 2em 3em 17em;
  overflow-y: scroll;
  height: 100%;
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: var(--gray-color); /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(230, 240, 255, 0.2); /*스크롤바 뒷 배경 색상*/
    border-radius: 10px;
  }
`;

const QueryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
  color: var(--icon-color);
  gap: 0 1em;
`;

export {
  BoxSearchResult,
  BoxRecentQuery,
  BoxClover,
  TitleRecent,
  BoxInner,
  QueryItem,
};
