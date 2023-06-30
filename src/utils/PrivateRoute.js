import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  //let auth = { token: localStorage.loginIsValid };
  let auth = { token: document.cookie ? true : false };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
