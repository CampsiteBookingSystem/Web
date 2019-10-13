import React from 'react';

import bugsnagClient from '../../plugins/bugsnag';

const ErrorBoundary =
  bugsnagClient === undefined ? React.Fragment : bugsnagClient.getPlugin('react');

export default ErrorBoundary;
