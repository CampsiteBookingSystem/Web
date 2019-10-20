import React from 'react';
import { Link } from 'react-router-dom';
import { Establishment as EstablishmentType } from '@vulpee/js-api';

import './Establishment.css';

interface Props {
  establishment: EstablishmentType;
}

function Establishment(props: Props) {
  return (
    <Link className="Establishments__item" to={`/${props.establishment.slug}`}>
      <div className="Establishments__item-header">
        <span className="Establishments__item-separator" />
        <div className="Establishments__item-logo" />
      </div>
      <div className="Establishments__item-content">
        <div className="Establishments__item-name">{props.establishment.name}</div>
        <ul className="Establishments__item-information">
          <li>3 new bookings</li>
        </ul>
      </div>
    </Link>
  );
}

export default Establishment;
