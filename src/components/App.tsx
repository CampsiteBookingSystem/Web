import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import store, { history } from '../store';

import bugsnagClient from '../plugins/bugsnag';

import './App.css';

const ErrorBoundary =
  bugsnagClient === undefined ? React.Fragment : bugsnagClient.getPlugin('react');

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={() => <div className="App">Hello world</div>} />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
