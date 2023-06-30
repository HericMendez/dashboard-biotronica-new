import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';
import AuthSplitLayout from 'layouts/AuthSplitLayout';
import bgImg from 'assets/img/biotronica/logado.png';
import Flex from 'components/common/Flex';

const Login = () => {
  return (
    <AuthSplitLayout bgProps={{ image: bgImg, position: '50% 20%' }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>Login</h3>
        <p className="mb-0 text-warning fs--1">
          <span className="fw-semi-bold text-black ">Não possui conta? </span>
          <Link className="fw-bold text-warning" to="/register">
            Cadastre-se
          </Link>
        </p>
      </Flex>
      <LoginForm layout="split" hasLabel />
    </AuthSplitLayout>
  );
};

export default Login;
