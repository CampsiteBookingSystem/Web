import React, { useState, FormEvent } from 'react';
import { Button, Input } from '@vulpee/ui';
import { Error } from '@vulpee/js-api';

import { VulpeeApi } from '../../../../api';

import './Form.css';

interface Props {
  onSubmit?: (email: string) => void;
}

function Form(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [valid, setValid] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await VulpeeApi.forgotPassword(email);

      setValid(true);

      if (props.onSubmit) {
        props.onSubmit(email);
      }
    } catch (exception) {
      setError(exception.error);
    }

    setLoading(false);
  }

  function handleChange() {
    setError(undefined);
    setValid(false);
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
          error={error !== undefined}
          errorMessage={error && error.field === 'uid' ? error.message : undefined}
          onChange={value => {
            setEmail(value);
            handleChange();
          }}
        />
      </div>
      {valid && (
        <div className="ForgotPasswordForm__message">
          An email with instructions on how to reset your password has been sent.
        </div>
      )}
      <div className="ForgotPasswordForm__actions">
        <Button
          type="submit"
          size="large"
          disabled={!isValid || valid}
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
