import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from 'standard-hooks';

import { State } from '../store';

import { handleError } from '../helpers';

import { VulpeeApi } from '../api';

import AppActionTypes from '../actions/AppActions';

import { AppContextInterface, AppContext } from '../contexts';

import Dashboard from './Dashboard';
import Authentication from './Authentication';

import './App.css';

function App() {
  const [localToken, setLocalToken] = useLocalStorage<string>('token');

  const [loading, setLoading] = useState<boolean>(false);

  const token = useSelector((state: State) => state.app.token);
  const authenticated = useSelector((state: State) => state.app.authenticated);
  const dispatch = useDispatch();

  const appContextValue: AppContextInterface = {};

  useEffect(() => {
    if (token) {
      setLocalToken(token);

      VulpeeApi.getInstance().setToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (localToken) {
      dispatch({ type: AppActionTypes.SET_TOKEN, payload: { token: localToken } });

      const verify = async () => {
        setLoading(true);

        try {
          VulpeeApi.getInstance().setToken(localToken);

          await VulpeeApi.getInstance().verify();

          dispatch({ type: AppActionTypes.LOGIN });
        } catch (exception) {
          handleError(exception);
        }

        setLoading(false);
      };

      verify();
    } else {
      dispatch({ type: AppActionTypes.LOGOUT });
    }
  }, []);

  let children;

  if (loading || authenticated === undefined) {
    children = <Fragment />;
  } else if (authenticated) {
    children = <Dashboard />;
  } else {
    children = <Authentication />;
  }

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

export default App;
