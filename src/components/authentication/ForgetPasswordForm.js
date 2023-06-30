import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ForgetPasswordForm = () => {
  // State
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      toast.success(` ${email} with password reset link`, {
        theme: 'colored'
      });
      navigate('/code');
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Endereço de email'}
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit" disabled={!email}>
          Enviar link neste email
        </Button>
      </Form.Group>

      <Link className="fs--1 text-600" to="#!">
        Não recebi o código
        <span className="d-inline-block ms-1"> &rarr;</span>
      </Link>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;
