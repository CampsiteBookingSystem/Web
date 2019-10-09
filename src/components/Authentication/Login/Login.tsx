import React from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

function Login() {
  return (
    <div className="Authentication__container">
      <div className="Authentication__header">
        <h1 className="Authentication__title">Welcome!</h1>
        <p className="Authentication__subtitle">Connect to your account to start using Vulpee.</p>
      </div>
      <div className="Authentication__form">
        <Form />
      </div>
      <div className="Authentication__links">
        <Link className="Authentication__link" to="/forgot-password">
          I forgot my password
        </Link>
      </div>
    </div>
  );
}

export default Login;
