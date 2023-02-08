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
    width: 100%;
  }
`;

const FormInput = styled.form`
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  border-radius: 50px;
  padding: 0.5em 1em 0.5em 0.5em;
`;

export { BoxCommentCreate, FormInput };
