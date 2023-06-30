import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useCookies } from 'hooks/useCookies';
const LogoutContent = ({ titleTag: TitleTag }) => {
  const cookie = useCookies();

  useEffect(() => {
    cookie.deleteToken();
  }, []);

  useEffect(() => {
    localStorage.setItem('username', '');
  }, []);
  return (
    <>
      <TitleTag>Até mais!</TitleTag>
      <p>
        Obrigado por ter escolhido os serviços da Biotrônica,{' '}
        <br className="d-none d-sm-block" />
        volte quando quiser!
      </p>
      <Button
        as={Link}
        color="primary"
        size="sm"
        className="mt-3"
        to={`/login`}
      >
        <FontAwesomeIcon
          icon="chevron-left"
          transform="shrink-4 down-1"
          className="me-1"
        />
        Voltar para a tela de Login
      </Button>
    </>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: 'simple',
  titleTag: 'h4'
};

export default LogoutContent;
