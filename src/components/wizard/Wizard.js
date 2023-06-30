import React from 'react';
import PropTypes from 'prop-types';
import WizardLayout from './WizardLayout';
import AuthWizardProvider from './AuthWizardProvider';

const Wizard = () => {
  return (
    <AuthWizardProvider>
      <WizardLayout variant={true} validation={true} progressBar={false} />
    </AuthWizardProvider>
  );
};

Wizard.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

export default Wizard;
