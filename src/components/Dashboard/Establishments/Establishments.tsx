import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../../store';

import Establishment from './Establishment';

import './Establishments.css';

function Establishments() {
  const { establishments } = useSelector((state: State) => state.establishment);

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
