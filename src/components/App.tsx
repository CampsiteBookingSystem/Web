import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import store, { history } from '../store';

import bugsnagClient from '../plugins/bugsnag';
import { register, unregister } from '../plugins/fetchIntercept';

import Authentication from './Authentication';

import './App.css';

const ErrorBoundary =
  bugsnagClient === undefined ? React.Fragment : bugsnagClient.getPlugin('react');

function App() {
  useEffect(() => {
    register();

    return () => unregister();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={Authentication} />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
