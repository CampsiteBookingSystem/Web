import React, { useState, FormEvent } from 'react';
import { Button, Input } from '@owlnite/ui';

import './Form.css';

interface Props {
  onSubmit?: (email: string, password: string) => void;
}

function Form(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    // Call API
    console.log('onSubmit');

    setLoading(false);

    if (props.onSubmit) {
      props.onSubmit(email, password);
    }
  }

  const isValid = email !== '' && password !== '';

  return (
    <form className="LoginForm" noValidate onSubmit={handleSubmit}>
      <div className="LoginForm__input">
        <Input
          id="email"
          name="email"
          type="email"
          theme="primary"
          label="My email address"
          placeholder="email@example.com"
          required
          emptyErrorMessage="Please enter your email address."
          onChange={setEmail}
        />
      </div>
      <div className="LoginForm__input">
        <Input
          id="password"
          name="password"
          type="password"
          theme="primary"
          label="My password"
          placeholder="********"
          required
          canTogglePassword
          emptyErrorMessage="Please enter your password."
          onChange={setPassword}
        />
      </div>
      <div className="LoginForm__actions">
        <Button
          type="submit"
          size="large"
          disabled={!isValid}
          loading={loading}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default Form;
