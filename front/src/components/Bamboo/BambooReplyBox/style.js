import styled from 'styled-components';

const BoxCommentCreate = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  background-color: var(--main-color);
  width: 100%;
  border-radius: 25px 25px 0 0;
  padding: 1em;
  input {
    background-color: white;
    width: 100%;
    border-radius: 50px;
    padding: 0.5em;
    margin-right: 1em;
  }
`;

export { BoxCommentCreate };
