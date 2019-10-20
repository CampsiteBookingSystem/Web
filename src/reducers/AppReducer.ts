import * as Redux from 'redux';
import { User } from '@vulpee/js-api';

import { AppActionTypes } from '../actions';

export interface AppState {
  authenticated?: boolean;
  token?: string;
  user?: User;

  userLoading: boolean;
  userError: boolean;
}

export const appInitialState: AppState = {
  authenticated: undefined,
  token: undefined,
  user: undefined,

  userLoading: false,
  userError: false,
};

export function appReducer(state: AppState = appInitialState, action: Redux.AnyAction) {
  switch (action.type) {
    case AppActionTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
      };

    case AppActionTypes.SET_TOKEN:
      return { ...state, token: action.payload.token };

    case AppActionTypes.FETCH_USER__REQUEST:
      return {
        ...state,
        userLoading: true,
        userError: false,
      };

    case AppActionTypes.FETCH_USER__SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
      };

    case AppActionTypes.FETCH_USER__FAIL:
      return {
        ...state,
        userLoading: false,
        userError: true,
      };

    case AppActionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: undefined,
        user: undefined,
      };

    default:
      return { ...appInitialState, ...state };
  }
}
