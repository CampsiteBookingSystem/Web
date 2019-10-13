import store from '../store';

import AppActionTypes from '../actions/AppActions';

function handleError(exception: Response) {
  if (exception.status === 401) {
    store.dispatch({ type: AppActionTypes.LOGOUT });
  }
}

export default handleError;
