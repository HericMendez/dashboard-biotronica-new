import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RegistrationForm = ({ hasLabel }) => {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    isAccepted: false
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  // Handler
  /*   const handleSubmit = e => {
    e.preventDefault();
    window.alert(`Successfully registered as ${formData.name}`);
  };
 */

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('isvalid:', e.currentTarget.checkValidity());

    setValidated(true);
    if (
      e.currentTarget.checkValidity() === true &&
      formData.password === formData.confirmPassword
    ) {
      axios
        .post('https://cliente.biotronica.tech/login/user', {
          username: formData.name,
          email: formData.email,
          password: formData.password
        })
        .then(response => {
          console.log('STATUS: ', response.status, 'DATA: ', response.data);

          window.alert(
            `${formData.name}, seu cadastro foi realizado com sucesso!`
          );
          navigate('/login');
          //  setToken(() => response.data.token);
        })
        .catch(e => {
          window.alert('Ocorreu um erro no cadastro!');
          console.log('erro: ', e);
        });
    }
  };
  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-1">
        {hasLabel && <Form.Label>Nome de usuário</Form.Label>}
        <InputGroup hasValidation>
          <Form.Control
            placeholder={!hasLabel ? 'Email' : ''}
            value={formData.name}
            name="name"
            onChange={handleFieldChange}
            type="text"
            pattern="(?=.*[a-zA-Z]).{5,16}"
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira um nome de usuário com pelo menos 5 caracteres!
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-1">
        {hasLabel && <Form.Label>Email</Form.Label>}
        <InputGroup hasValidation>
          <Form.Control
            placeholder={!hasLabel ? 'Email' : ''}
            value={formData.email}
            name="email"
            onChange={handleFieldChange}
            type="email"
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira um email válido!
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-1">
        {hasLabel && <Form.Label>Senha</Form.Label>}
        <InputGroup hasValidation>
          <Form.Control
            placeholder={!hasLabel ? 'Senha' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
            required
            pattern="(?=.*[^A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"
          />
          <Form.Control.Feedback type="invalid">
            A senha deve conter entre 8 a 16 caracteres, incluindo pelo menos
            uma letra (a-z), um número (0-9) e um caractere especial
            (?!@#$%^&*_=+-)
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Confirmar senha</Form.Label>}
        <InputGroup hasValidation>
          <Form.Control
            placeholder={!hasLabel ? 'Confirmar Senha' : ''}
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleFieldChange}
            type="password"
            required
            pattern={formData.password}
          />
          <Form.Control.Feedback type="invalid">
            {formData.confirmPassword === ''
              ? 'Confirme sua senha'
              : 'Senhas não coincidem!'}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        {/*         <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              className="mb-0 bg-400"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>
 */}
        <Col xs="auto">
          <Form.Group className="mb-3">
            <InputGroup hasValidation>
              <Form.Check
                type="checkbox"
                id="acceptCheckbox"
                className="form-check "
              >
                <Form.Check.Input
                  type="checkbox"
                  name="isAccepted"
                  className="bg-warning"
                  required
                  checked={formData.isAccepted}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      isAccepted: e.target.checked
                    })
                  }
                />

                <Form.Check.Label className="form-label text-black">
                  Eu aceito os{' '}
                  <Link className="fw-sem-bold text-warning" to="#!">
                    Termos de Uso
                  </Link>{' '}
                  e a{' '}
                  <Link className="fw-sem-bold text-warning" to="#!">
                    Política de Privacidade
                  </Link>
                </Form.Check.Label>
                <Form.Control.Feedback type="invalid">
                  Você deve aceitar os termos de uso para continuar!
                </Form.Control.Feedback>
              </Form.Check>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <Button
          color="primary"
          className="mt-3 w-100"
          /* disabled={!formData.email || !formData.password} */
          type="submit"
        >
          Entrar
        </Button>
      </Form.Group>
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
