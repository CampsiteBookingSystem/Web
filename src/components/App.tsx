import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from 'standard-hooks';

import { State } from '../store';

import { register, unregister } from '../plugins/fetchIntercept';

import { VulpeeApi } from '../api';

import AppActionTypes from '../actions/AppActions';

import Dashboard from './Dashboard';
import Authentication from './Authentication';

import './App.css';

function App() {
  const [localToken, setLocalToken] = useLocalStorage<string>('token');

  const [loading, setLoading] = useState<boolean>(false);

  const token = useSelector((state: State) => state.app.token);
  const authenticated = useSelector((state: State) => state.app.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    register();

    return () => unregister();
  }, []);

  useEffect(() => {
    if (localToken) {
      dispatch({ type: AppActionTypes.SET_TOKEN, payload: { token: localToken } });

      const verify = async () => {
        setLoading(true);

        try {
          await VulpeeApi.verify();

          dispatch({ type: AppActionTypes.LOGIN });
        } catch {}

        setLoading(false);
      };

      verify();
    } else {
      dispatch({ type: AppActionTypes.LOGOUT });
    }
  }, []);

  useEffect(() => {
    if (token) {
      setLocalToken(token);
    }
  }, [token]);

  if (loading || authenticated === undefined) {
    return <Fragment />;
  }

  if (authenticated) {
    return <Dashboard />;
  }

  return <Authentication />;
}

export default App;
