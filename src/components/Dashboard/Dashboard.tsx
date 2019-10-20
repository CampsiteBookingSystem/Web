import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';

import { State } from '../../store';
import { fetchUser, fetchEstablishments } from '../../actions';

import Header from './Header';
import Establishments from './Establishments';
import Establishment from './Establishment';

import './Dashboard.css';

function Dashboard() {
  const { userLoading } = useSelector((state: State) => state.app);
  const { establishmentsLoading } = useSelector((state: State) => state.establishment);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchEstablishments());
  }, [dispatch]);

  const isLoading = userLoading || establishmentsLoading;

  return (
    <div className="Dashboard">
      <Header />
      <main className="Dashboard__content">
        {isLoading ? (
          <div />
        ) : (
          <Switch>
            <Route path="/" exact component={Establishments} />
            <Route path="/:slug" component={Establishment} />
          </Switch>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
