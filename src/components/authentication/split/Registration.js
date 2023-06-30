import React from 'react';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import RegistrationForm from 'components/authentication/RegistrationForm';
import bgImg from 'assets/img/biotronica/register.png';
import AuthSplitLayout from 'layouts/AuthSplitLayout';

const Registration = () => {
  return (
    <AuthSplitLayout bgProps={{ image: bgImg }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>Cadastrar</h3>
        <p className="mb-0 fs--1">
          <span className="fw-semi-bold text-black">Já possui cadastro? </span>
          <Link className="text-warning fw-bold" to="/login">
            Entrar
          </Link>
        </p>
      </Flex>
      <RegistrationForm layout="split" hasLabel />
    </AuthSplitLayout>
  );
};

export default Registration;
