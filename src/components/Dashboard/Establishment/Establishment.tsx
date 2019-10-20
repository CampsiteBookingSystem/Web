import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { State } from '../../../store';
import { fetchEstablishment } from '../../../actions';

import { NotFound } from '../../Error';

import './Establishment.css';

function Establishment() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { establishments, establishmentLoading } = useSelector(
    (state: State) => state.establishment,
  );

  const establishment = establishments.find(item => item.slug === slug);

  useEffect(() => {
    if (establishment && !establishment.role) {
      dispatch(fetchEstablishment(establishment.id));
    }
  }, [establishment, dispatch]);

  if (!establishment) {
    return <NotFound title="Establishment not found" />;
  }

  if (establishmentLoading || !establishment.role) {
    return <div className="Establishment">Loading...</div>;
  }

  return <div className="Establishment">{establishment.name}</div>;
}

export default Establishment;
