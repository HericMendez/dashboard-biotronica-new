import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Nav, ProgressBar } from 'react-bootstrap';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import PasswordResetEmail from './PasswordResetEmail';
import PasswordResetCode from './PasswordResetCode';
import RedefinePassword from './RedefinePassword';
import Success from './Success';
import AppContext, { AuthWizardContext } from 'context/Context';
import IconButton from 'components/common/IconButton';
import WizardModal from './WizardModal';
import Flex from 'components/common/Flex';
import axios from 'axios';
const WizardLayout = ({ variant, validation, progressBar }) => {
  const { isRTL } = useContext(AppContext);
  const { user, setUser, step, setStep } = useContext(AuthWizardContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors
  } = useForm();

  const [modal, setModal] = useState(false);

  const navItems = [
    {
      icon: '1',
      label: 'Email'
    },
    {
      icon: 'user',
      label: 'Código'
    },
    {
      icon: '',
      label: 'Nova Senha'
    },
    {
      icon: 'thumbs-up',
      label: 'Pronto!'
    }
  ];

  const onSubmitData = data => {
    handleStepRequest(Object.values(data));
    console.log(Object.values(data));
    setUser({ ...user, ...data });
  };
  const onError = () => {
    if (!validation) {
      clearErrors();
    }
  };

  const toggle = () => setModal(!modal);

  const handleStepRequest = async data => {
    console.log('data ', data);
    switch (step) {
      case 1:
        await axios
          .post('/login/user/recovery', { email: data[0] })
          .then(({ data, status }) => {
            if (status === 200) {
              alert(`Código ${data.message}`);
              console.log(data.message);
              setStep(step + 1);
            }
          })
          .catch(e => {
            console.log(e.response);
            alert('Erro! Email não está cadastrado!');
          });
        break;
      case 2:
        await axios
          .post('/login/user/validate_recovery', { code: data[1] })
          .then(({ data, status }) => {
            if (status === 200) {
              //   alert(`${data.message}`);
              console.log(data.message);
              setStep(step + 1);
            }
          })
          .catch(e => {
            console.log(e.response);
            alert('Erro! Código inválido ou expirado!');
          });
        break;
      case 3:
        axios
          .put('/login/user/recovery_password', {
            user: data[0],
            newpassword: data[3]
          })
          .then(response => {
            console.log(response.data);
            setStep(step + 1);
          })
          .catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao registrar nova senha!');
          });

        break;

      default:
        break;
    }
  };

  const handleNavs = targetStep => {
    if (step !== 4) {
      if (targetStep < step) {
        console.log(targetStep);
      } else {
        handleSubmit(onSubmitData, onError)();
      }
    } else {
      toggle();
    }
  };

  return (
    <>
      <WizardModal modal={modal} setModal={setModal} />
      <Card
        as={Form}
        noValidate
        onSubmit={handleSubmit(onSubmitData, onError)}
        className="theme-wizard mb-5"
      >
        <Card.Header
          className={classNames('bg-light', {
            'px-4 py-3': variant === 'pills',
            'pb-2': !variant
          })}
        >
          <Nav className="justify-content-center" variant={variant}>
            {variant === 'pills'
              ? navItems.map((item, index) => (
                  <NavItemPill
                    key={item.label}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={item.icon}
                    label={item.label}
                  />
                ))
              : navItems.map((item, index) => (
                  <NavItem
                    key={item.label}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
          </Nav>
        </Card.Header>
        {progressBar && <ProgressBar now={step * 25} style={{ height: 2 }} />}
        <Card.Body className="fw-normal px-md-6 py-4">
          {step === 1 && (
            <PasswordResetEmail
              register={register}
              errors={errors}
              setValue={setValue}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <PasswordResetCode
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {step === 3 && (
            <RedefinePassword
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}
          {step === 4 && <Success reset={reset} />}
        </Card.Body>
        <Card.Footer
          className={classNames('px-md-6 bg-light', {
            'd-none': step === 4,
            ' d-flex': step < 4
          })}
        >
          <IconButton
            variant="link"
            icon={isRTL ? 'chevron-right' : 'chevron-left'}
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 fw-semi-bold', {
              'd-none': step === 1
            })}
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Anterior
          </IconButton>

          <IconButton
            variant="primary"
            className="ms-auto px-5"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            Próximo
          </IconButton>
        </Card.Footer>
      </Card>
    </>
  );
};
const NavItem = ({ index, step, handleNavs, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: index < 4 ? step > index : step > 3,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <span className="nav-item-circle-parent">
          <span className="nav-item-circle">
            <p className="fs-1">{index}</p>
          </span>
        </span>
        <span className="d-none d-md-block mt-1 fs--1">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
};

const NavItemPill = ({ index, step, handleNavs, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: step > index,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <Flex alignItems="center" justifyContent="center">
          <p className="fs-1">{index}</p>
          <span className="d-none d-md-block mt-1 fs--1 ms-2">{label}</span>
        </Flex>
      </Nav.Link>
    </Nav.Item>
  );
};

WizardLayout.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

NavItemPill.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  handleNavs: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

NavItem.propTypes = NavItemPill.propTypes;

export default WizardLayout;
