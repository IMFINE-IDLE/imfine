import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  // const token = localStorage.getItem('accessToken');
  console.log('public', isLogin);
  // console.log('public', token);
  return isLogin ? <Navigate to="/" /> : <>{children}</>;
  // return token !== 'null' ? <Navigate to="/" /> : <>{children}</>;
};

const PrivateRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  // const token = localStorage.getItem('accessToken');
  // console.log('private', token);
  console.log('private', isLogin);
  // return token !== 'null' ? <>{children}</> : <Navigate to="/login" />;
  return isLogin ? <>{children}</> : <Navigate to="/login" />;
};

export { PublicRoute, PrivateRoute };
