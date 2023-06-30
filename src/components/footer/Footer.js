import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
          <br className="d-sm-none" /> &#174; {new Date().getFullYear()}{' '}
          <a href="https://themewagon.com">Biotrônica</a>. Todos os direitos
          reservados.
        </p>
      </Col>
      <Col sm="auto">
        <p className="mb-0 text-600">
          <a href="https://themewagon.com">Termos de uso</a>
          <span className="d-none d-sm-inline-block"> | </span>
          <a href="https://themewagon.com">Política de Privacidade</a>
          <span className="d-none d-sm-inline-block"> | </span>
          <a href="https://themewagon.com">Status</a>
        </p>
      </Col>

      <Col sm="auto">
        <p className="mb-0 text-600">v{version}</p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
