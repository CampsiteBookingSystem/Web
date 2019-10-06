import React from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

function Login() {
  return (
    <div>
      <h1 className="Authentication__title">Recover your password</h1>
      <div className="Authentication__form">
        <Form />
      </div>
      <div className="Authentication__links">
        <Link className="Authentication__link" to="/">
          Go back to the sign in form
        </Link>
      </div>
    </div>
  );
}

export default Login;
