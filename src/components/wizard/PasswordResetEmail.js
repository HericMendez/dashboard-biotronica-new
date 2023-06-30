import React from 'react';
import PropTypes from 'prop-types';
import WizardInput from './WizardInput';
import { Link } from 'react-router-dom';
const PasswordResetEmail = ({ register, errors, setStep }) => {
  return (
    <>
      <WizardInput
        type="email"
        errors={errors}
        label="Insira seu email de usuário e enviaremos um código de redefinição de senha para você."
        name="email"
        placeholder="Endereço de email"
        formGroupProps={{ className: 'mb-3' }}
        formControlProps={{
          ...register('email', {
            required: 'Campo obrigatório',
            pattern: {
              value:
                /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
              message: 'Insira um email válido'
            }
          })
        }}
      />
      <Link onClick={() => setStep(2)} className="fs--1 text-700" to="#!">
        Já possuo um código válido&nbsp;
        <span className="d-inline-block ms-1"> →</span>
      </Link>
    </>
  );
};

PasswordResetEmail.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default PasswordResetEmail;
