import React from 'react';
import PropTypes from 'prop-types';
import WizardInput from './WizardInput';
import { Link } from 'react-router-dom';

const PasswordResetCode = ({ register, errors, setValue, setStep }) => {
  return (
    <>
      <WizardInput
        type="text"
        errors={errors}
        label="Digite o código de redefinição enviado em seu email. O código expira em 15 minutos."
        name="resetCode"
        setValue={setValue}
        formGroupProps={{ className: 'mb-3' }}
        formControlProps={{
          ...register('resetCode', {
            required: 'Campo obrigatório'
          })
        }}
      />
      <Link onClick={() => setStep(1)} className="fs--1 text-700" to="#!">
        <span className="d-inline-block ms-1"> ←</span>
        &nbsp; Não recebi o código
      </Link>
    </>
  );
};

PasswordResetCode.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired
};

export default PasswordResetCode;
