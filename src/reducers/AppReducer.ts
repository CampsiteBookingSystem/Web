import * as Redux from 'redux';

import AppActionTypes from '../actions/AppActions';

export interface AppState {
  authenticated?: boolean;
  token?: string;
}

export const appInitialState: AppState = {
  authenticated: undefined,
  token: undefined,
};

function appReducer(state: AppState = appInitialState, action: Redux.AnyAction) {
  switch (action.type) {
    case AppActionTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
      };

    case AppActionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
      };

    case AppActionTypes.SET_TOKEN:
      return { ...state, token: action.payload.token };

    default:
      return { ...appInitialState, ...state };
  }
}

export default appReducer;
