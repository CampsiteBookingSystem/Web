import React from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

function ForgotPassword() {
  return (
    <div className="Authentication__container">
      <div className="Authentication__header">
        <h1 className="Authentication__title">I forgot my password</h1>
        <p className="Authentication__subtitle">
          Enter your email here and we'll send you an email with instructions on how to recover your
          account.
        </p>
      </div>
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

export default ForgotPassword;
