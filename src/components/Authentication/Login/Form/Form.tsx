import React, { useState } from 'react';
import { Button } from 'booking-system-ui';

import { Input } from '../../Elements';

import './Form.css';

interface Props {
  onSubmit?: (email: string, password: string) => void;
}

function Form(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    setLoading(true);

    // Call API

    setLoading(false);

    if (props.onSubmit) {
      props.onSubmit(email, password);
    }
  }

  return (
    <form className="LoginForm">
      <div className="LoginForm__input">
        <Input
          name="email"
          type="email"
          label="Votre adresse e-mail"
          onChange={(name, value) => setEmail(value)}
        />
      </div>
      <div className="LoginForm__input">
        <Input
          name="password"
          type="password"
          label="Votre mot de passe"
          onChange={(name, value) => setPassword(value)}
        />
      </div>
      <div className="LoginForm__actions">
        <Button scope="rounded" loading={loading} onClick={handleSubmit}>
          Me connecter
        </Button>
      </div>
    </form>
  );
}

export default Form;
