import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../../store';

import Establishment from './Establishment';

import './Establishments.css';
import { Redirect } from 'react-router';

function Establishments() {
  const { establishments } = useSelector((state: State) => state.establishment);

  if (establishments.length === 1) {
    return <Redirect to={`/${establishments[0].slug}`} />;
  }

  return (
    <div className="Establishments">
      <div className="Establishments__items">
        {establishments.map(establishment => (
          <Establishment key={establishment.id} establishment={establishment} />
        ))}
      </div>
    </div>
  );
}

export default Establishments;
