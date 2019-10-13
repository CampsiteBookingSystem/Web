import React from 'react';
import { Switch, Route } from 'react-router';

import { Login, ForgotPassword, ResetPassword } from '.';

import './Authentication.css';

function Authentication() {
  return (
    <div className="Authentication">
      <div className="Authentication__image" />
      <div className="Authentication__content">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/reset-password" exact component={ResetPassword} />
        </Switch>
      </div>
    </div>
  );
}

export default Authentication;
