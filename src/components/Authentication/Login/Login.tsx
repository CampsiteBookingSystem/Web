import React from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

import './Login.css';

function Login() {
  return (
    <div className="Login">
      <h1 className="Login__title">Me connecter</h1>
      <div className="Login__form">
        <Form />
      </div>
      <div className="Login__links">
        <Link className="Login__link" to="/register">
          Créer un compte
        </Link>
      </div>
    </div>
  );
}

export default Login;
