import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useCookies } from 'hooks/useCookies';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const LoginForm = ({ hasLabel }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [validated, setValidated] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  // const [token, setToken] = useState('');
  const navigate = useNavigate();
  const cookie = useCookies();

  /* 
  useEffect(() => {
    localStorage.setItem('loginIsValid', false);
  }, []);

  const getToken = async () => {
    await axios
      .get('https://cliente.biotronica.tech/company/association', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          console.log('deu bom');
          callcookie('Token ', token, 1);

          window.alert(`Logged in as ${formData.email}`, {
            theme: 'colored'
          });
          navigate('/', { state: { farms: response.data.farms } });
          localStorage.setItem('farms', JSON.stringify(response.data.farms));
        } else {
          localStorage.setItem('loginIsValid', false);
          window.alert('Invalid Credentials!', {
            theme: 'colored'
          });
        }
      })
      .catch(e => console.log(e));
  };

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://cliente.biotronica.tech/login/user/login', {
        email: formData.email,
        password: formData.password
      })
      .then(response => {
        console.log('STATUS: ', response.status, 'DATA: ', response.data);
        setToken(() => response.data.token);
        getToken();
      })
      .catch(e => console.log('erro: ', e));
  }; */

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    console.log('isvalid: ', event.currentTarget.checkValidity());
    setValidated(true);
    axios
      .post('https://cliente.biotronica.tech/login/user/login', {
        email: formData.email,
        password: formData.password
      })
      .then(response => {
        console.log(
          'STATUS: ',
          response.status,
          'DATA: ',
          response.data.username
        );
        cookie.setToken('Token ', response.data.token, 1);
        localStorage.setItem('username', response.data.username);
        navigate('/');
        window.alert(`Bem-vindo, ${response.data.username}!`);

        //  setToken(() => response.data.token);
      })
      .catch(e => {
        window.alert('Credenciais inválidas! \nVerifique o email e a senha!');
        console.log('erro: ', e);
      });
  };
  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
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

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Senha</Form.Label>}
        <InputGroup hasValidation>
          <Form.Control
            placeholder={!hasLabel ? 'Senha' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type={passwordType}
            required
            /*  pattern="(?=.*[^A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}" */
          />
          <InputGroup.Text onClick={togglePassword}>
            {passwordType == 'text' ? <FaEye /> : <FaEyeSlash />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            Digite sua senha!
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
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

        <Col xs="auto">
          <Link className="fs--1 mb-0 text-warning" to={`/forgot-password`}>
            Esqueceu a senha?
          </Link>
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

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
