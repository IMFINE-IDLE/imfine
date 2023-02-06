import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import useInput from '../../../hooks/useInput';
import { BoxCommentCreate } from './style';

function BambooReplyBox({ replyBamboo }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <BoxCommentCreate>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="댓글 작성하기"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (inputValue.length >= 1) {
            replyBamboo(inputValue);
            setInputValue('');
          } else {
            alert('댓글 내용을 입력해주세요.');
          }
        }}
      >
        <FiEdit />
      </button>
    </BoxCommentCreate>
  );
}

export default BambooReplyBox;
