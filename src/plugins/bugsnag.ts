import React from 'react';
import bugsnag, { Bugsnag } from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

const apiKey: string | undefined = process.env.REACT_APP_BUGSNAG_API_KEY;

let bugsnagClient: Bugsnag.Client | undefined;

if (apiKey !== undefined) {
  bugsnagClient = bugsnag(apiKey);

  bugsnagClient.use(bugsnagReact, React);
}

export default bugsnagClient;
