import React from 'react';
import PropTypes from 'prop-types';
import WizardInput from './WizardInput';

const RedefinePassword = ({ register, errors, watch }) => {
  return (
    <>
      <WizardInput
        type="password"
        errors={errors}
        label="Digite sua nova senha"
        placeholder="Digite a senha"
        name="password"
        formControlProps={{
          ...register('password', {
            required: 'Digite a senha!',
            pattern: {
              value: /(?=.*[^A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}/,
              message:
                ' A senha deve conter entre 8 a 16 caracteres, incluindo pelo menos uma letra (a-z), um número (0-9) e um caractere especial (?!@#$%^&*_=+-)'
            }
          })
        }}
      />
      <WizardInput
        type="password"
        errors={errors}
        placeholder="Confirme a nova senha"
        name="confirmPassword"
        formControlProps={{
          ...register('confirmPassword', {
            validate: value =>
              value === watch('password') || 'As senhas não coincidem!'
          })
        }}
      />
    </>
  );
};

RedefinePassword.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired
};

export default RedefinePassword;
