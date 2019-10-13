import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import appReducer from './AppReducer';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
  });

export default rootReducer;
