import React from 'react';
import PropTypes from 'prop-types';
import Background from 'components/common/Background';
import { Col, Row, Container } from 'react-bootstrap';

import Logo from 'components/common/Logo';

const AuthSplitLayout = ({ children, bgProps }) => {
  return (
    <Container fluid>
      <Row className="min-vh-100 bg-100">
        <Col sm={10} lg={5} className="px-4 align-self-center mx-auto py-5">
          <Logo width={450} textClass="fs-4" />

          <div className="p-4">{children}</div>
        </Col>
        <Col xs={7} className="d-none d-lg-block position-relative">
          {bgProps && <Background {...bgProps} />}
        </Col>
      </Row>
    </Container>
  );
};

AuthSplitLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bgProps: PropTypes.shape(Background.propTypes).isRequired
};

export default AuthSplitLayout;
