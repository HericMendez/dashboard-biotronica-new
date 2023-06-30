import React from 'react';
import bgImg from 'assets/img/biotronica/forgot.png';
import AuthSplitLayout from 'layouts/AuthSplitLayout';

import Wizard from 'components/wizard/Wizard';
const ForgetPassword = () => {
  return (
    <AuthSplitLayout
      bgProps={{ image: bgImg, position: '50% 76%', overlay: true }}
    >
      <div className="text-center">
        <h4 className="mb-0">Esqueceu a senha, muuuu?</h4>
        <small>
          Insira seu email e te enviaremos um link de redefinição de senha.
        </small>
        <Wizard validation={true} />
      </div>
    </AuthSplitLayout>
  );
};

export default ForgetPassword;
