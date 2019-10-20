import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@vulpee/ui';
import { Error } from '@vulpee/js-api';

import { VulpeeApi } from '../../../../api';
import { AppActionTypes } from '../../../../actions';

import './Form.css';

interface Props {
  onSubmit?: (token: string) => void;
}

function Form(props: Props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError(undefined);

    try {
      const { token } = await VulpeeApi.getInstance().login(email, password);

      if (props.onSubmit) {
        props.onSubmit(token);
      }

      setLoading(false);

      dispatch({ type: AppActionTypes.SET_TOKEN, payload: { token } });
      dispatch({ type: AppActionTypes.LOGIN });
    } catch (exception) {
      const data = await exception.json();

      setError(data.error);
    }

    setLoading(false);
  }

  function handleChange() {
    setError(undefined);
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
          error={error !== undefined}
          errorMessage={error && error.field === 'uid' ? error.message : undefined}
          onChange={value => {
            setEmail(value);
            handleChange();
          }}
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
          error={error && error.field === 'password'}
          errorMessage={error && error.field === 'password' ? error.message : undefined}
          onChange={value => {
            setPassword(value);
            handleChange();
          }}
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
