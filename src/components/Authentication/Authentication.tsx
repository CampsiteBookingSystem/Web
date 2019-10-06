import React from 'react';
import { Switch, Route } from 'react-router';

import { Login, ForgotPassword } from '.';

import './Authentication.css';

function Authentication() {
  return (
    <div className="Authentication">
      <div className="Authentication__image" />
      <div className="Authentication__content">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
        </Switch>
      </div>
    </div>
  );
}

export default Authentication;
