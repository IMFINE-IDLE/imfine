import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? <>{children}</> : <Navigate to="/" />;
};

const PrivateRoute = ({ children }) => {
  const token = !!localStorage.getItem('accessToken');
  console.log(token);
  return token ? <Navigate to="/login" /> : <>{children}</>;
};

export { PublicRoute, PrivateRoute };
