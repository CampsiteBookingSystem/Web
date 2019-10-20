import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import rootReducer, { AppState, EstablishmentState } from '../reducers';

export interface State {
  router: RouterState;
  app: AppState;
  establishment: EstablishmentState;
}

export const history = createBrowserHistory();

const historyMiddleWare = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({});

const middleware: any[] = [thunk, historyMiddleWare];

const configureStore = () => {
  const initialState = {};

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
};

export default configureStore();
