import React from 'react';
import { Switch, Route } from 'react-router';

import { Login } from '.';

import './Authentication.css';

function Authentication() {
  return (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default Authentication;
