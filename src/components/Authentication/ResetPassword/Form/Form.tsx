import React, { useState, FormEvent, useContext } from 'react';
import { Button, Input } from '@vulpee/ui';
import { Error } from '@vulpee/js-api';

import { AppContextInterface, AppContext } from '../../../../contexts';

import './Form.css';

interface Props {
  token: string;
  onSubmit?: () => void;
}

function Form(props: Props) {
  const appContext = useContext<AppContextInterface>(AppContext);

  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [valid, setValid] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await appContext.vulpeeApi.resetPassword(props.token, password, passwordConfirmation);

      setValid(true);

      if (props.onSubmit) {
        props.onSubmit();
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

  const isValid = password !== '' && passwordConfirmation !== '';

  return (
    <form className="ResetPasswordForm" noValidate onSubmit={handleSubmit}>
      <div className="ResetPasswordForm__input">
        <Input
          id="password"
          name="password"
          type="password"
          theme="primary"
          label="My new password"
          placeholder="********"
          required
          emptyErrorMessage="Please enter your new password."
          error={error !== undefined}
          errorMessage={error ? error.message : undefined}
          onChange={value => {
            setPassword(value);
            handleChange();
          }}
        />
      </div>
      <div className="ResetPasswordForm__input">
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          theme="primary"
          label="My new password confirmation"
          placeholder="********"
          required
          emptyErrorMessage="Please confirm your new password."
          error={error !== undefined}
          errorMessage={error && error.field === 'passwordConfirmation' ? error.message : undefined}
          onChange={value => {
            setPasswordConfirmation(value);
            handleChange();
          }}
        />
      </div>
      {valid && (
        <div className="ResetPasswordForm__message">
          Your password has been changed. You should now be able to login.
        </div>
      )}
      <div className="ResetPasswordForm__actions">
        <Button
          type="submit"
          size="large"
          disabled={!isValid || valid}
          loading={loading}
          onClick={handleSubmit}
        >
          Change password
        </Button>
      </div>
    </form>
  );
}

export default Form;
