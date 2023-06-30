import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import AppContext from 'context/Context';
import LogoWhite from 'assets/img/biotronica/logo_biotronica.png';
import LogoBlack from 'assets/img/biotronica/logo_biotronica_black.png';

const Logo = ({ at, className, ...rest }) => {
  const {
    config: { isDark }
  } = useContext(AppContext);
  return (
    <Link
      to="/"
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          'd-flex',
          {
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center fw-bolder fs-5 mb-4': at === 'auth'
          },
          className
        )}
      >
        <img
          className="me-2"
          src={isDark ? LogoWhite : LogoBlack}
          alt="Logo"
          width={200}
        />
      </div>
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),

  className: PropTypes.string
};

Logo.defaultProps = { at: 'auth', width: 58 };

export default Logo;
