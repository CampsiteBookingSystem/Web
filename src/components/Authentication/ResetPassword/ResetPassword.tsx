import React from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import qs from 'qs';

import Form from './Form';

function ResetPassword() {
  const { search } = useLocation();

  const { token } = qs.parse(search.replace('?', ''));

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Authentication__container">
      <div className="Authentication__header">
        <h1 className="Authentication__title">Change my password</h1>
        <p className="Authentication__subtitle">Choose a new password for your account.</p>
      </div>
      <div className="Authentication__form">{<Form token={token} />}</div>
      <div className="Authentication__links">
        <Link className="Authentication__link" to="/">
          Go back to the sign in form
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
