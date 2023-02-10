import React, { useState } from 'react';

function SearchUser() {
  const [userList, setUserList] = useState([]);

  return (
    <div>
      SearchUser
      <div>유저 검색결과</div>
    </div>
  );
}

export default SearchUser;
