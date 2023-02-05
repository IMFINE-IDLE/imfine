import React from 'react';
import { FiEdit } from 'react-icons/fi';
import useInput from '../../../hooks/useInput';
import { BoxCommentCreate } from './style';

function CommentCreate() {
  const [inputValue, setInputValue] = useInput('');
  return (
    <BoxCommentCreate>
      <input
        onChange={setInputValue}
        value={inputValue}
        type="text"
        placeholder="댓글 작성하기"
      />
      <button>
        <FiEdit />
      </button>
    </BoxCommentCreate>
  );
}

export default CommentCreate;
