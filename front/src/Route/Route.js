import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = !!localStorage.getItem('accessToken');
  console.log('public', token);
  return token ? <Navigate to="/" /> : <>{children}</>;
};

const PrivateRoute = ({ children }) => {
  const token = !!localStorage.getItem('accessToken');
  console.log('private', token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export { PublicRoute, PrivateRoute };
