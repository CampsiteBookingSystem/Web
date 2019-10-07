import React, { useState, FormEvent } from 'react';
import { Button, Input } from '@owlnite/ui';

import './Form.css';

interface Props {
  onSubmit?: (email: string) => void;
}

function Form(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    // Call API
    console.log('onSubmit');

    setLoading(false);

    if (props.onSubmit) {
      props.onSubmit(email);
    }
  }

  const isValid = email !== '';

  return (
    <form className="ForgotPasswordForm" noValidate onSubmit={handleSubmit}>
      <div className="ForgotPasswordForm__input">
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
      <div className="ForgotPasswordForm__actions">
        <Button
          type="submit"
          size="large"
          disabled={!isValid}
          loading={loading}
          onClick={handleSubmit}
        >
          Recover password
        </Button>
      </div>
    </form>
  );
}

export default Form;
