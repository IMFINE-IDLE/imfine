import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import useInput from '../../../hooks/useInput';
import { BoxCommentCreate, FormInput } from './style';

function BambooReplyBox({ replyBamboo }) {
  const [inputValue, setInputValue] = useState('');

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      replyBamboo(inputValue);
      setInputValue('');
    } else {
      alert('댓글 내용을 입력해주세요.');
    }
  };
  return (
    <BoxCommentCreate>
      <FormInput>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="댓글 작성하기"
        />
        <button type="submit" onClick={handleCreateComment}>
          <FiEdit />
        </button>
      </FormInput>
    </BoxCommentCreate>
  );
}

export default BambooReplyBox;
