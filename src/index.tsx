import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';

import 'sanitize.css/sanitize.css';
import 'sanitize.css/forms.css';

import '@vulpee/ui/lib/styles/fonts/open-sans.css';
import '@vulpee/ui/lib/styles/colors.css';

import './index.css';

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
