import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  // console.log('public', isLogin);
  return isLogin ? <Navigate to="/" /> : <>{children}</>;
};

const PrivateRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  // console.log('private', isLogin);
  return isLogin ? <>{children}</> : <Navigate to="/login" />;
};

export { PublicRoute, PrivateRoute };
