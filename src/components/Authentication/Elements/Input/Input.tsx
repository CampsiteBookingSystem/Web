import React, { useState, ChangeEvent } from 'react';
import classNames from 'classnames';

import './Input.css';

interface Props {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password';
  label: string;
  placeholder?: string;
  initialValue?: string;
  onChange?: (name: string, value: string) => void;
  onBlur?: (name: string, value: string) => void;
}

function Input(props: Props) {
  const [value, setValue] = useState<string>(props.initialValue || '');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);

    if (props.onChange) {
      props.onChange(props.name, event.target.value);
    }
  }

  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    if (props.onBlur) {
      props.onBlur(props.name, event.target.value);
    }
  }

  const classes = classNames('AuthenticationInput', {
    'AuthenticationInput--has-value': value !== '',
  });

  return (
    <div className={classes}>
      <label className="AuthenticationInput__label" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="AuthenticationInput__input"
        name={props.name}
        value={value}
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default Input;
