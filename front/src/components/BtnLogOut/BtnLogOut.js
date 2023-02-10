import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logOut } from '../../store/slice/userSlice';

function BtnLogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutByData = async () => {
    try {
      const success = await dispatch(logOut()).unwrap();
      console.log(success);
    } catch (rejectWithValue) {
      console.log(rejectWithValue);
      // alert(rejectWithValue);
      navigate('/login');
    }
  };
  return <button onClick={() => logOutByData()}>로그아웃</button>;
}

export default BtnLogOut;
