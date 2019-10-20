import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { appReducer, establishmentReducer } from '.';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
    establishment: establishmentReducer,
  });

export default rootReducer;
